import Joi from "joi";
import { BookingStatus, PaymentStatus } from "./booking.enum";

export const bookingValidation = {
  createBooking: Joi.object({
    event_id: Joi.string().hex().length(24).required(),
    artist_id: Joi.string().hex().length(24).required(),
    notes: Joi.string().optional().max(500)
  }),
  updateBooking: Joi.object({
    status: Joi.string().valid(...Object.values(BookingStatus)).optional(),
    payment_status: Joi.string().valid(...Object.values(PaymentStatus)).optional(),
    cancellation_reason: Joi.string().optional().max(500)
  })
};
