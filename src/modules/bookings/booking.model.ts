import { Schema, model } from "mongoose";
import { IBooking } from "./booking.interface";
import { BookingStatus, PaymentStatus } from "./booking.enum";

const bookingSchema = new Schema<IBooking>(
  {
    event_id: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },
    artist_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    organizer_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    booking_date: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.PENDING
    },
    payment_status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING
    },
    amount: {
      type: Number,
      required: true
    },
    notes: {
      type: String,
      required: false
    },
    cancellation_reason: {
      type: String,
      required: false
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

// Indexes for better query performance
bookingSchema.index({ event_id: 1 });
bookingSchema.index({ artist_id: 1 });
bookingSchema.index({ organizer_id: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ payment_status: 1 });
bookingSchema.index({ booking_date: 1 });

export const Booking = model<IBooking>("Booking", bookingSchema);
