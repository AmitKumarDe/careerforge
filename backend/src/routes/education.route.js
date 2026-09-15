import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createEducationSchema, updateEducationSchema } from "../validators/education.validator.js";
import { addEducation, getMyEducations, removeEducation, updateMyEducation } from "../controllers/education.controller.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/education")
  .post(validate(createEducationSchema), addEducation)
  .get(getMyEducations);

router
  .route("/education/:id")
  .patch(validate(updateEducationSchema), updateMyEducation)
  .delete(removeEducation);

export default router;
