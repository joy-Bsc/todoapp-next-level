import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  // Accept either `MONGODB_URI` (common) or `MONGO_URI` (legacy in this project)
  const uriRaw = process.env.MONGODB_URI || process.env.MONGO_URI;
  const uri = uriRaw ? uriRaw.trim() : undefined;
  if (!uri) {
    throw new Error("❌ MONGODB_URI (or MONGO_URI) is missing in environment variables");
  }

  try {
    await mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB || "todo",
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}
