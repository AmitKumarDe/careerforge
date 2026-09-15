import { Router } from "express";
import validate from "../middleware/validate.middleware.js";
import { changePasswordSchema, forgotPasswordSchema, loginSchema, registerSchema, resendVerificationSchema, resetPasswordSchema } from "../validators/auth.validator.js";
import { changePassword, forgotPassword, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, resendVerificationEmail, resetPassword, verifyEmail } from "../controllers/auth.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";


const router = Router();

router.route("/register").post(
    validate(registerSchema),
    registerUser
);

router.route("/login").post(
    validate(loginSchema),
    loginUser
);


router.route("/me").get(
    verifyJWT,
    getCurrentUser
);

router.route("/logout").post(
    verifyJWT,
    logoutUser
);

router.route("/refresh").post(
    refreshAccessToken
);

router.route("/change-password").post(
    verifyJWT,
    validate(changePasswordSchema),
    changePassword
);

router.route("/forgot-password").post(
    validate(forgotPasswordSchema),
    forgotPassword
);

router.route("/reset-password/:token").post(
    validate(resetPasswordSchema),
    resetPassword
);

router.route("/verify-email/:token").post(
    verifyEmail
);

router.route("/resend-verification").post(
    validate(resendVerificationSchema),
    resendVerificationEmail
);
export default router;