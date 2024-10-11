// server/middleware/multerMiddleware.js

import multer from "multer";
import path from "path";
import fs from 'fs';
import mime from 'mime';
// Configure multer for file uploads



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file)
    let { email, _id } = req.user
    email = email.split('@')[0]
    _id = _id.toString()
    const uploadPath = `uploads/blogs/${email}/${_id}`;

    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);

  },
  filename: function (req, file, cb) {
    const extension = mime.extension(file.mimetype);
    let fileName;
    if (file.filename === "titleImage") {
      fileName = Date.now() + "_title_image" + '.' + extension
    } else {
      fileName = Date.now() + "_content_image" + '.' + extension
    }
    cb(null, fileName); // Appending extension
  }
});


export const upload = multer({ storage: storage });


