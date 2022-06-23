import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import ErrorResponse from "../utils/ErrorResponse";

const fileUpload =
  (path: string) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.files) {
      return next();
    }

    const file = req.files.file as UploadedFile;

    if (!file) {
      return next(new ErrorResponse(`Please upload a file`, 400));
    }

    if (!file.mimetype.startsWith("image")) {
      return next(new ErrorResponse(`Please upload an image file`, 400));
    }

    if (file.size > Number(process.env.MAX_FILE_UPLOAD)) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }

    //create a custom filename
    file.name = `photo_${new Date().getTime()}.${file.mimetype.split("/")[1]}`;
    //move the file to the uploads folder
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${path}/${file.name}`, (err) => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }
    });

    //add the file name to the body of the request
    req.body.photo = file.name;
    next();
  };

export default fileUpload;
