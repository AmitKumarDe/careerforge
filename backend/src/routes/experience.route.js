import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
  createExperienceSchema,
  updateExperienceSchema,
} from "../validators/experience.validator.js";

import {
  addExperience,
  getMyExperiences,
  editExperience,
  removeExperience,
} from "../controllers/experience.controller.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/experience")
  .post(validate(createExperienceSchema), addExperience)
  .get(getMyExperiences);

router
  .route("/experience/:id")
  .patch(validate(updateExperienceSchema), editExperience)
  .delete(removeExperience);

export default router;
