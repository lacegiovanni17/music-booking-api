import { Booking } from "./booking.model";
import { IBooking, IBookingCreateRequest, IBookingQueryParams, IBookingUpdateRequest } from "./booking.interface";
import { NotFoundException } from "../../utils/exceptions/not_found.exception";
import { BadRequestsException } from "../../utils/exceptions/bad_request.exception";
import { Types } from "mongoose";
import User from "../users/user.model";
import { Event } from "../events/event.model";
import { UserRoles } from "../users/user.enum";
import { IGenericResponseModel } from "../../utils/interfaces/generic_response.interface";
import UtilService from "../../utils/services/utils.service";

class BookingService {
  private utilservice = new UtilService();

  public async createBooking(
    bookingData: IBookingCreateRequest,
    organizerId: string
  ): Promise<IGenericResponseModel<IBooking>> {
    try {
      // Validate event exists
      const event = await Event.findById(bookingData.event_id);
      if (!event) {
        throw new NotFoundException("Event not found");
      }

      // Validate artist exists and is actually an artist
      const artist = await User.findById(bookingData.artist_id);
      if (!artist || artist.user_role !== UserRoles.ARTIST) {
        throw new BadRequestsException("Invalid artist");
      }

      // Check if artist is already booked for this event
      const existingBooking = await Booking.findOne({
        event_id: bookingData.event_id,
        artist_id: bookingData.artist_id
      });

      if (existingBooking) {
        throw new BadRequestsException("Artist already booked for this event");
      }

      // Calculate booking amount (could be from event or artist pricing)
      const amount = 1000; // Default amount - replace with your logic

      const newBooking = await Booking.create({
        event_id: bookingData.event_id,
        artist_id: bookingData.artist_id,
        organizer_id: organizerId,
        amount,
        notes: bookingData.notes
      });

      return this.utilservice.buildApiResponse<IBooking>({
        data: newBooking,
        message: "Booking created successfully",
        statusCode: 201,
        success: true
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  }

  public async getBookingById(bookingId: string): Promise<IGenericResponseModel<IBooking>> {
    try {
      const booking = await Booking.findById(bookingId)
        .populate("event_id", "title event_date location")
        .populate("artist_id", "first_name last_name email")
        .populate("organizer_id", "first_name last_name email");

      if (!booking) {
        throw new NotFoundException("Booking not found");
      }

      return this.utilservice.buildApiResponse<IBooking>({
        data: booking,
        message: "Booking retrieved successfully",
        statusCode: 200,
        success: true
      });
    } catch (error) {
      console.error("Error getting booking:", error);
      throw error;
    }
  }

  public async updateBooking(
    bookingId: string,
    updateData: IBookingUpdateRequest,
    userId: string
  ): Promise<IGenericResponseModel<IBooking>> {
    try {
      // Check if booking exists and belongs to the user
      const existingBooking = await Booking.findOne({
        _id: bookingId,
        $or: [{ organizer_id: userId }, { artist_id: userId }]
      });

      if (!existingBooking) {
        throw new NotFoundException("Booking not found or unauthorized");
      }

      const updatedBooking = await Booking.findByIdAndUpdate(bookingId, updateData, { new: true })
        .populate("event_id", "title event_date location")
        .populate("artist_id", "first_name last_name email")
        .populate("organizer_id", "first_name last_name email");

      if (!updatedBooking) {
        throw new NotFoundException("Booking not found");
      }

      return this.utilservice.buildApiResponse<IBooking>({
        data: updatedBooking,
        message: "Booking updated successfully",
        statusCode: 200,
        success: true
      });
    } catch (error) {
      console.error("Error updating booking:", error);
      throw error;
    }
  }

  public async listBookings(
    queryParams: IBookingQueryParams,
    userId: string
  ): Promise<IGenericResponseModel<IBooking[]>> {
    try {
      const { event_id, artist_id, organizer_id, status, payment_status, date_from, date_to } = queryParams;

      const filter: any = {};

      if (event_id) filter.event_id = event_id;
      if (artist_id) filter.artist_id = artist_id;
      if (organizer_id) filter.organizer_id = organizer_id;
      if (status) filter.status = status;
      if (payment_status) filter.payment_status = payment_status;

      // Add user-specific filtering
      filter.$or = [{ organizer_id: userId }, { artist_id: userId }];

      if (date_from || date_to) {
        filter.booking_date = {};
        if (date_from) filter.booking_date.$gte = new Date(date_from);
        if (date_to) filter.booking_date.$lte = new Date(date_to);
      }

      const bookings = await Booking.find(filter)
        .populate("event_id", "title event_date location")
        .populate("artist_id", "first_name last_name email")
        .populate("organizer_id", "first_name last_name email")
        .sort({ booking_date: -1 });

      return this.utilservice.buildApiResponse<IBooking[]>({
        data: bookings,
        message: "Bookings retrieved successfully",
        statusCode: 200,
        success: true
      });
    } catch (error) {
      console.error("Error listing bookings:", error);
      throw error;
    }
  }
}

export const bookingService = new BookingService();
