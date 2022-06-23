"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorResponse_1 = __importDefault(require("../utils/ErrorResponse"));
const fileUpload = (path) => (req, res, next) => {
    if (!req.files) {
        return next();
    }
    const file = req.files.file;
    if (!file) {
        return next(new ErrorResponse_1.default(`Please upload a file`, 400));
    }
    if (!file.mimetype.startsWith("image")) {
        return next(new ErrorResponse_1.default(`Please upload an image file`, 400));
    }
    if (file.size > Number(process.env.MAX_FILE_UPLOAD)) {
        return next(new ErrorResponse_1.default(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400));
    }
    //create a custom filename
    file.name = `photo_${new Date().getTime()}.${file.mimetype.split("/")[1]}`;
    //move the file to the uploads folder
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${path}/${file.name}`, (err) => {
        if (err) {
            console.error(err);
            return next(new ErrorResponse_1.default(`Problem with file upload`, 500));
        }
    });
    //add the file name to the body of the request
    req.body.photo = file.name;
    next();
};
exports.default = fileUpload;
//# sourceMappingURL=fileUpload.middleware.js.map