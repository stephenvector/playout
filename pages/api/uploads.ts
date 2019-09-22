import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function Uploads(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (process.env.MONGODB_URI === undefined) {
    throw new Error("MONGODB_URI env variable missing!");
  }

  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  await client.connect();

  const db = client.db();

  const files = await db
    .collection("fs.files")
    .find({})
    .toArray();

  res.json({
    files
  });
}
