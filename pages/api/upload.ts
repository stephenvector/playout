import mongodb from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import Busboy from "busboy";
import { inspect } from "util";

export default function UploadHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === undefined || req.method.toLowerCase() !== "post") {
    throw new Error("Invalid method.");
  }

  var busboy = new Busboy({ headers: req.headers });
  busboy.on("file", function(fieldname, file, filename, encoding, mimetype) {
    console.log(
      "File [" +
        fieldname +
        "]: filename: " +
        filename +
        ", encoding: " +
        encoding +
        ", mimetype: " +
        mimetype
    );
    file.on("data", function(data) {
      console.log("File [" + fieldname + "] got " + data.length + " bytes");
    });
    file.on("end", function() {
      console.log("File [" + fieldname + "] Finished");
    });
  });
  busboy.on("field", function(
    fieldname,
    val,
    fieldnameTruncated,
    valTruncated,
    encoding,
    mimetype
  ) {
    console.log("Field [" + fieldname + "]: value: " + inspect(val));
  });
  busboy.on("finish", function() {
    console.log("Done parsing form!");
    // res.writeHead(303, { Connection: "close", Location: "/" });
    res.status(300);
  });
  req.pipe(busboy);
}

export const config = {
  api: {
    bodyParser: false
  }
};
