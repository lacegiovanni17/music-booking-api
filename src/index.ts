import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db"; // Import the optimized db connection
import rootRouter from "./modules/root.routes";
import { errorMiddleware } from "./middleware/error.middleware";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/music_booking";
connectDB(MONGO_URI);

// Routes
app.get("/", (req, res) => {
  res.send("🎵 Welcome to the Music Booking API!");
});

app.use("/api/v1", rootRouter);

// ❗ Error Handling Middleware MUST be **after** all routes
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  errorMiddleware(err, req, res, next);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
