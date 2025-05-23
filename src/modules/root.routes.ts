import { Router } from "express";
import authRoutes from "./auth/auth.routes";
import userRoutes from "./users/user.routes";
import artistRouter from "./artists/artist.routes";
import eventRouter from "./events/event.routes";
import bookingRouter from "./bookings/booking.routes";
import { applyBookingRateLimit } from "../middleware/ratelimit.middleware";

const router = Router();

// Register module routes
router.use("/auth", authRoutes);      // Authentication (Login, Register)
router.use("/users", userRoutes);      // User management (Artists, Organizers)
router.use("/artists", artistRouter);  // Artist-specific routes
router.use("/events", eventRouter);    // Event creation & management
router.use("/bookings", applyBookingRateLimit, bookingRouter);// Booking transactions

export default router;
