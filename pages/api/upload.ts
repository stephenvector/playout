import mongodb from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import Busboy from "busboy";

export default function UploadHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === undefined || req.method.toLowerCase() !== "post") {
    throw new Error("Invalid method.");
  }

  if (process.env.MONGODB_URI === undefined) {
    throw new Error("MONGODB_URI env variable missing!");
  }

  const client = new mongodb.MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true
  });

  var busboy = new Busboy({ headers: req.headers });
  busboy.on("file", function(
    _fieldname,
    filestream,
    filename,
    _encoding,
    _mimetype
  ) {
    client.connect(() => {
      const db = client.db();
      const bucket = new mongodb.GridFSBucket(db);
      const uploadStream = bucket.openUploadStream(filename);
      const id = uploadStream.id;

      filestream.pipe(uploadStream);

      uploadStream.on("error", () => {
        return res.status(500).json({ message: "Error uploading file" });
      });

      uploadStream.on("finish", () => {
        return res.status(201).json({
          message:
            "File uploaded successfully, stored under Mongo ObjectID: " + id
        });
      });
    });
  });
  return req.pipe(busboy);
}

export const config = {
  api: {
    bodyParser: false
  }
};
