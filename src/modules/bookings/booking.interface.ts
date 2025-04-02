import { Document, Types } from "mongoose";
import { BookingStatus, PaymentStatus } from "./booking.enum";

export interface IBooking extends Document {
  event_id: Types.ObjectId;
  artist_id: Types.ObjectId;
  organizer_id: Types.ObjectId;
  booking_date: Date;
  status: BookingStatus;
  payment_status: PaymentStatus;
  amount: number;
  notes?: string;
  cancellation_reason?: string;
  created_at: Date;
  updated_at: Date;
}

export interface IBookingCreateRequest {
  event_id: string;
  artist_id: string;
  notes?: string;
}

export interface IBookingUpdateRequest {
  status?: BookingStatus;
  payment_status?: PaymentStatus;
  cancellation_reason?: string;
}

export interface IBookingQueryParams {
  event_id?: string;
  artist_id?: string;
  organizer_id?: string;
  status?: BookingStatus;
  payment_status?: PaymentStatus;
  date_from?: string;
  date_to?: string;
}
