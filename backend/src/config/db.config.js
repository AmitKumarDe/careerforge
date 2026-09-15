import mongoose from "mongoose";
import dns from "dns";

// Use public DNS to resolve MongoDB Atlas SRV records (fixes querySrv ECONNREFUSED)
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  // Ignore in environments where custom DNS servers cannot be set
}

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB connected successfully ✅: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB connection failed ❌");
    console.error(error.message);

    process.exit(1);
  }
}

export default connectDB;