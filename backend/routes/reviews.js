import express from "express";
import { getGoogleReviews } from "../controllers/googleReviewController.js";

const router = express.Router();

router.get("/reviews", getGoogleReviews);

export default router;
