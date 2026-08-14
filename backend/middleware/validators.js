import { body, param, query, validationResult } from "express-validator";

// Runs after the per-route validation chains and short-circuits on failure
export const validate = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: result.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

// export const appointmentRules = [
//   body("patientName")
//     .trim()
//     .notEmpty()
//     .withMessage("Patient name is required")
//     .isLength({ max: 100 })
//     .withMessage("Name is too long"),
//   body("email")
//     .trim()
//     .isEmail()
//     .withMessage("A valid email is required")
//     .normalizeEmail(),
//   body("phone")
//     .trim()
//     .matches(/^[0-9+\-\s()]{7,20}$/)
//     .withMessage("A valid phone number is required"),
//   body("serviceId").isMongoId().withMessage("A valid service must be selected"),
//   body("appointmentDate")
//     .isISO8601()
//     .toDate()
//     .withMessage("A valid appointment date is required"),
//   body("timeSlot").trim().notEmpty().withMessage("A time slot is required"),
//   body("medicalNotes")
//     .optional({ checkFalsy: true })
//     .isLength({ max: 1500 })
//     .withMessage("Medical notes are too long"),
// ];

export const statusUpdateRules = [
  param("id").isMongoId().withMessage("Invalid appointment id"),
  body("status")
    .isIn(["Pending", "Confirmed", "Completed", "Cancelled"])
    .withMessage("Invalid status value"),
];

export const serviceRules = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Service title is required")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Service description is required")
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),
];

// export const testimonialRules = [
//   body("patientName").trim().notEmpty().withMessage("Patient name is required"),
//   body("conditionTreated")
//     .trim()
//     .notEmpty()
//     .withMessage("Condition treated is required"),
//   body("reviewText")
//     .trim()
//     .notEmpty()
//     .withMessage("Review text is required")
//     .isLength({ max: 800 }),
//   body("rating")
//     .isInt({ min: 1, max: 5 })
//     .withMessage("Rating must be between 1 and 5"),
// ];

export const loginRules = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("A valid email is required")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

export const paginationRules = [
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
];
