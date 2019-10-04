import { isEmail } from "validator";
import zxcvbn from "zxcvbn";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import { JWK, JWT } from "@panva/jose";
import { Request, Response, NextFunction } from "express";
import {
  USERS_COLLECTION_NAME,
  AUTH_ACTION_SIGN_IN,
  AUTH_ACTION_SIGN_UP,
  AUTH_HASH_ROUNDS,
  MIN_ZXCVBN_SCORE
} from "../constants";

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
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.method !== "POST") {
    return next(new Error("Invalid request method"));
  }

  if (req.body === null) {
    return next(new Error("Didn't pass enough information"));
  }

  const { email, password, action } = req.body;

  if (
    action === null ||
    action === undefined ||
    (action !== AUTH_ACTION_SIGN_UP && action !== AUTH_ACTION_SIGN_IN)
  ) {
    return next(new Error("Auth action not specified or not valid."));
  }

  if (email === undefined || email === null) {
    return next(new Error("No email specified."));
  }

  if (password === undefined || password === null) {
    return next(new Error("No password specified."));
  }

  const cleanedUpEmail = email.trim().toLowerCase();

  if (!isEmail(cleanedUpEmail)) {
    return next(new Error("Invalid email."));
  }

  const passwordRating = zxcvbn(password);

  if (passwordRating.score < MIN_ZXCVBN_SCORE) {
    return next(new Error("Invalid password."));
  }

  const dbConnection = await getDBConnection();

  const result = await dbConnection
    .db()
    .collection(USERS_COLLECTION_NAME)
    .findOne<User>({ email: cleanedUpEmail });

  if (action === AUTH_ACTION_SIGN_IN) {
    if (result === null || result === undefined) {
      return next(new Error("Invalid user"));
    }

    const passwordResult = bcrypt.compareSync(password, result.passwordHash);

    if (passwordResult !== true) {
      return next(new Error("Invalid password."));
    }

    const jwtPayload = {
      user: {
        email: result.email,
        id: result._id
      }
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
    return next(new Error("Sanity check failure."));
  }
}
