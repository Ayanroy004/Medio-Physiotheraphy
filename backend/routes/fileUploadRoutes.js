import express from "express";
import multer from "multer";
import upload from "../config/multer.js";
import {
  uploadSingleImage,
  uploadMultipleImages,
} from "../controllers/fileUploadController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/uploadSingle",
  protect,
  authorize("admin", "therapist"),
  upload.single("image"),
  uploadSingleImage,
);

router.post(
  "/uploadMulti",
  protect,
  authorize("admin", "therapist"),
  upload.array("images", 10),
  uploadMultipleImages,
);

export default router;
