import express from "express";
import {
  createBooking,
  getBooking,
  updateBooking,
  listBookings
} from "./booking.controller";
import { authenticateUser } from "../../middleware/auth.middleware";
import  validationMiddleware  from "../../middleware/validation.middleware";
import { bookingValidation } from "./booking.validation";

const bookingRouter = express.Router();


bookingRouter.post(
  "/create-booking",
  authenticateUser,
  validationMiddleware(bookingValidation.createBooking),
  createBooking
);

// Get booking by ID (Organizer or Artist)
bookingRouter.get(
  "/getbooking/:id",
  authenticateUser,
  getBooking
);

// Update booking status (Organizer or Artist)
bookingRouter.put(
  "/update-booking/:id",
  authenticateUser,
  validationMiddleware(bookingValidation.updateBooking),
  updateBooking
);

// List bookings (Organizer or Artist)
bookingRouter.get(
  "/list-bookings",
  authenticateUser,
  listBookings
);

export default bookingRouter;
