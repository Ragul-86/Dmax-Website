import mongoose from "mongoose";

/**
 * Connects to MongoDB using MONGODB_URI from the environment.
 * Exits the process on failure so orchestrators (pm2, Docker, etc.)
 * can restart cleanly rather than run with a dead DB connection.
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("[db] MONGODB_URI is not set. Check your .env file.");
    process.exit(1);
  }

  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(uri);
    console.log("[db] MongoDB connected");
  } catch (err) {
    console.error("[db] MongoDB connection failed:", err.message);
    process.exit(1);
  }

  mongoose.connection.on("disconnected", () => {
    console.warn("[db] MongoDB disconnected");
  });
  mongoose.connection.on("error", (err) => {
    console.error("[db] MongoDB error:", err.message);
  });
}
