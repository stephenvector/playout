import mongodb from "mongodb";
import { Request, Response, NextFunction } from "express";
import formidable from "formidable";

export default async function uploadRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (process.env.MONGODB_URI === undefined) {
    throw new Error("MONGODB_URI env variable missing!");
  }

  const uploadStreams: Promise<string>[] = [];

  try {
    const client = await new mongodb.MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true
    }).connect();

    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      console.log(files);

      await Promise.all(uploadStreams);
    });

    const db = client.db();
    const bucket = new mongodb.GridFSBucket(db);

    form.on("file", (filename, file) => {
      uploadStreams.push(
        new Promise((resolve, reject) => {
          const uploadStream = bucket.openUploadStream(filename);
          const id = uploadStream.id;

          uploadStream.on("finish", () => {
            resolve(id.toString());
          });

          uploadStream.on("error", error => {
            reject(error);
          });
        })
      );
    });
  } catch (e) {
    return next(e);
  }
}
