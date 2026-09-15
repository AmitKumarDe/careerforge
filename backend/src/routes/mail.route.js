import { Router } from "express";
import { sendTestEmail } from "../controllers/mail.controller.js";

const router = Router();

router.route("/test").get(sendTestEmail);

export default router;