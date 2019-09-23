import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { CONTENT_TYPES_COLLECTION_NAME } from "../../constants";

export default async function ContentTypes(
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

  let contentTypes = await client
    .db()
    .collection(CONTENT_TYPES_COLLECTION_NAME)
    .find({})
    .toArray();

  contentTypes = contentTypes.map(contentType => ({
    id: contentType._id,
    email: contentType.email
  }));

  res.json({
    contentTypes
  });
}
