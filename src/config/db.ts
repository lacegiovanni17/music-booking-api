import mongoose from "mongoose";

const connectDB = async (url: string): Promise<void> => {
  try {
    const mongooseOptions = {
      serverSelectionTimeoutMS: 30000, // Timeout for server selection (30s)
      socketTimeoutMS: 3600000, // Keep socket open for 1 hour
    };

    mongoose.set("strictQuery", true);
    mongoose.set("strictPopulate", false);

    await mongoose.connect(url, mongooseOptions);
    console.log("✅ MongoDB connected successfully...");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
