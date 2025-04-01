import { Router } from "express";
// import authRoutes from "./auth/auth.routes";
import userRoutes from "./users/user.routes";
// import artistRoutes from "./artists/artist.routes";
// import eventRoutes from "./events/event.routes";
// import bookingRoutes from "./bookings/booking.routes";

const router = Router();

// Register module routes
// router.use("/auth", authRoutes);      // Authentication (Login, Register)
router.use("/users", userRoutes);      // User management (Artists, Organizers)
// router.use("/artists", artistRoutes);  // Artist-specific routes
// router.use("/events", eventRoutes);    // Event creation & management
// router.use("/bookings", bookingRoutes);// Booking transactions

export default router;
