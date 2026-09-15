import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
  updateProfileSchema,
  updateSkillsSchema,
} from "../validators/profile.validator.js";

import {
  getMyProfile,
  updateMyProfile,
  updateMySkills,
} from "../controllers/profile.controller.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/profile")
  .get(getMyProfile)
  .patch(validate(updateProfileSchema), updateMyProfile);

router
  .route("/profile/skills")
  .patch(validate(updateSkillsSchema), updateMySkills);

export default router;
