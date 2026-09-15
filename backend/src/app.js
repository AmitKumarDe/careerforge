import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware.js";

// Router imports
import authRouter from "./routes/auth.route.js"
import mailRouter from "./routes/mail.route.js";
import profileRouter  from "./routes/profile.route.js";
import educationRouter from "./routes/education.route.js";
import experienceRouter from "./routes/experience.route.js";
const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:3000",
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"));
app.use(cookieParser());




app.use("/api/auth", authRouter);
app.use("/api/mail", mailRouter);
app.use("/api/users", profileRouter);
app.use("/api/users", educationRouter);
app.use("/api/users", experienceRouter);
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "CareerForge API is running 🚀",
    })
});

// Error handling middleware
app.use(errorMiddleware);

export default app;