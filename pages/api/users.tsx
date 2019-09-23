import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { USERS_COLLECTION_NAME } from "../../constants";

export default async function Users(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.MONGODB_URI === undefined) {
    throw new Error("MONGODB_URI env variable missing!");
  }

  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  await client.connect();

  let users = await client
    .db()
    .collection(USERS_COLLECTION_NAME)
    .find({})
    .toArray();

  users = users.map(user => ({ id: user._id, email: user.email }));

  res.json({
    users
  });
}
