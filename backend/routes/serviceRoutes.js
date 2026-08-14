import express from "express";

import {
  getServices,
  getServiceByIdOrSlug,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

import { protect, authorize } from "../middleware/auth.js";

import { serviceRules, validate } from "../middleware/validators.js";

import upload from "../config/multer.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get("/", getServices);

router.get("/:idOrSlug", getServiceByIdOrSlug);

/*
|--------------------------------------------------------------------------
| Create Service
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  protect,
  authorize("admin", "therapist"),
  upload.array("images", 10),
  serviceRules,
  validate,
  createService,
);

/*
|--------------------------------------------------------------------------
| Update Service
|--------------------------------------------------------------------------
*/

router.put(
  "/:id",
  protect,
  authorize("admin", "therapist"),
  upload.array("images", 10),
  serviceRules,
  validate,
  updateService,
);

/*
|--------------------------------------------------------------------------
| Delete Service
|--------------------------------------------------------------------------
*/

router.delete("/:id", protect, authorize("admin"), deleteService);

export default router;
