import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.config.js";
import app from "./app.js";




const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    app.listen(PORT, () => {
      console.log(`CareerForge server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}

startServer();