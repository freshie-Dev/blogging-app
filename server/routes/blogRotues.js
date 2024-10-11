// server/routes/blogRoutes.js

import express from "express";
import AsyncHandler from "express-async-handler";


import { upload } from "../middleware/multerMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import { fetchBlogs, fetchDrafts, postBlog, uploadSingleFile } from "../controllers/blogController.js";

const router = express.Router();

router.post('/upload_title_image', protect, upload.single('titleImage'), AsyncHandler(uploadSingleFile));
router.post('/upload_content_image', protect, upload.single('contentImage'), AsyncHandler(uploadSingleFile));
router.post('/post_blog', protect, AsyncHandler(postBlog))
router.get('/fetch_blogs', protect, AsyncHandler(fetchBlogs))
router.get('/fetch_drafts', protect, AsyncHandler(fetchDrafts))


export default router;
