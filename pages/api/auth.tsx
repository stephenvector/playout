import { isEmail } from "validator";
import zxcvbn from "zxcvbn";
import { MongoClient, Cursor } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { JWK, JWT } from "@panva/jose";
import {
  USERS_COLLECTION_NAME,
  AUTH_ACTION_SIGN_IN,
  AUTH_ACTION_SIGN_UP,
  AUTH_HASH_ROUNDS,
  MIN_ZXCVBN_SCORE
} from "../../constants";

interface User {
  email: string;
  passwordHash: string;
  _id: string;
}

if (process.env.MONGODB_URI === undefined) {
  throw new Error("No MongoDB URI defined in environment.");
}

if (process.env.JWT_SECRET === undefined) {
  throw new Error("No JWT Secret defined in environment.");
}

const authJWK = JWK.asKey(process.env.JWT_SECRET);

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function getDBConnection(): Promise<MongoClient> {
  const connection = await client.connect();
  return connection;
}

export default async function AuthEndpoint(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    throw new Error("Invalid request method");
  }

  if (req.body === null) {
    throw new Error("Didn't pass enough information");
  }

  const { email, password, action } = req.body;

  if (
    action === null ||
    action === undefined ||
    (action !== AUTH_ACTION_SIGN_UP && action !== AUTH_ACTION_SIGN_IN)
  ) {
    throw new Error("Auth action not specified or not valid.");
  }

  if (email === undefined || email === null) {
    throw new Error("No email specified.");
  }

  if (password === undefined || password === null) {
    throw new Error("No password specified.");
  }

  const cleanedUpEmail = email.trim().toLowerCase();

  if (!isEmail(cleanedUpEmail)) {
    throw new Error("Invalid email.");
  }

  const passwordRating = zxcvbn(password);

  if (passwordRating.score < MIN_ZXCVBN_SCORE) {
    throw new Error("Invalid password.");
  }

  const dbConnection = await getDBConnection();

  const result = await dbConnection
    .db()
    .collection(USERS_COLLECTION_NAME)
    .findOne<User>({ email: cleanedUpEmail });

  if (action === AUTH_ACTION_SIGN_IN) {
    if (result === null || result === undefined) {
      throw new Error("Invalid user");
    }

    const passwordResult = bcrypt.compareSync(password, result.passwordHash);

    if (passwordResult !== true) {
      throw new Error("Invalid password.");
    }

    const jwtPayload = {
      email: result.email,
      id: result._id
    };

    const token = JWT.sign(jwtPayload, authJWK);

    res.json({ token });
  } else if (action === AUTH_ACTION_SIGN_UP) {
    if (result !== null) {
      throw new Error("Email is already in use or is invalid.");
    }

    const passwordHash = bcrypt.hashSync(password, AUTH_HASH_ROUNDS);

    const signUpResult = await dbConnection
      .db()
      .collection(USERS_COLLECTION_NAME)
      .insertOne({
        email: cleanedUpEmail,
        passwordHash
      });

    res.json({ success: true });
  } else {
    throw new Error("Sanity check failure.");
  }
}
