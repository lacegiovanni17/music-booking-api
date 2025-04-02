import { Event } from "./event.model";
import { IEvent, IEventCreateRequest, IEventQueryParams, IEventUpdateRequest } from "./event.interface";
import { NotFoundException } from "../../utils/exceptions/not_found.exception";
import { BadRequestsException } from "../../utils/exceptions/bad_request.exception";
import User from "../users/user.model";
import { UserRoles } from "../users/user.enum";
import { IGenericResponseModel } from "../../utils/interfaces/generic_response.interface";
import UtilService from "../../utils/services/utils.service";

class EventService {
  private utilservice = new UtilService();

  // Create a new event
  public async createEvent(
    eventData: IEventCreateRequest,
    organizerId: string
  ): Promise<IGenericResponseModel<IEvent | null | Error>> {
    try {
      // Verify organizer exists and is actually an organizer
      const organizer = await User.findById(organizerId);
      if (!organizer || organizer.user_role !== UserRoles.ORGANIZER) {
        return this.utilservice.buildApiErrorResponse({
          data: null,
          message: "Only organizers can create events",
          statusCode: 403,
        });
      }

      // Validate artists if provided
      if (eventData.artists?.length) {
        const validArtists = await User.find({
          _id: { $in: eventData.artists },
          user_role: UserRoles.ARTIST,
        });

        if (validArtists.length !== eventData.artists.length) {
          return this.utilservice.buildApiErrorResponse({
            data: null,
            message: "One or more invalid artists provided",
            statusCode: 400,
          });
        }
      }

      const newEvent = await Event.create({
        ...eventData,
        organizer_id: organizerId,
        event_date: new Date(eventData.event_date),
      });

      return this.utilservice.buildApiResponse({
        data: newEvent,
        message: "Event created successfully",
        statusCode: 201,
        success: true,
      });
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  }

  // Get event by ID
  public async getEventById(
    eventId: string
  ): Promise<IGenericResponseModel<IEvent | Error>> {
    try {
      const event = await Event.findById(eventId)
        .populate("organizer_id", "first_name last_name email phone_number")
        .populate("artists", "first_name last_name email phone_number");

      if (!event) {
        throw new NotFoundException("Event not found");
      }

      return this.utilservice.buildApiResponse({
        data: event,
        message: "Event retrieved successfully",
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      console.error("Error retrieving event:", error);
      throw error;
    }
  }

  // Update an existing event
  public async updateEvent(
    eventId: string,
    updateData: IEventUpdateRequest,
    organizerId: string
  ): Promise<IGenericResponseModel<IEvent | null | Error>> {
    try {
      // Check event exists and belongs to organizer
      const existingEvent = await Event.findOne({
        _id: eventId,
        organizer_id: organizerId,
      });
      if (!existingEvent) {
        return this.utilservice.buildApiErrorResponse({
          data: null,
          message: "Event not found or unauthorized",
          statusCode: 404,
        });
      }

      // Validate artists if provided
      if (updateData.artists?.length) {
        const validArtists = await User.find({
          _id: { $in: updateData.artists },
          user_role: UserRoles.ARTIST,
        });
        
        if (validArtists.length !== updateData.artists.length) {
          return this.utilservice.buildApiErrorResponse({
            data: null,
            message: "One or more invalid artists provided",
            statusCode: 400,
          });
        }
      }

      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        {
          ...updateData,
          ...(updateData.event_date && { event_date: new Date(updateData.event_date) }),
        },
        { new: true }
      )
        .populate("organizer_id", "first_name last_name email phone_number")
        .populate("artists", "first_name last_name email phone_number");

      if (!updatedEvent) {
        throw new NotFoundException("Event not found during update");
      }

      return this.utilservice.buildApiResponse({
        data: updatedEvent,
        message: "Event updated successfully",
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  }

  // Delete an event
  public async deleteEvent(
    eventId: string,
    organizerId: string
  ): Promise<IGenericResponseModel<null | Error>> {
    try {
      const event = await Event.findOneAndDelete({
        _id: eventId,
        organizer_id: organizerId,
      });

      if (!event) {
        return this.utilservice.buildApiErrorResponse({
          data: null,
          message: "Event not found or unauthorized",
          statusCode: 404,
        });
      }

      return this.utilservice.buildApiResponse({
        data: null,
        message: "Event deleted successfully",
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  }

  // List events with filters
  public async listEvents(
    queryParams: IEventQueryParams
  ): Promise<IGenericResponseModel<IEvent[] | Error>> {
    try {
      const { status, date_from, date_to, location, organizer_id, artist_id } = queryParams;

      const filter: any = {};

      if (status) filter.status = status;
      if (location) filter.location = { $regex: location, $options: "i" };
      if (organizer_id) filter.organizer_id = organizer_id;
      if (artist_id) filter.artists = artist_id;

      if (date_from || date_to) {
        filter.event_date = {};
        if (date_from) filter.event_date.$gte = new Date(date_from);
        if (date_to) filter.event_date.$lte = new Date(date_to);
      }

      const events = await Event.find(filter)
        .populate("organizer_id", "first_name last_name email phone_number")
        .populate("artists", "first_name last_name email phone_number")
        .sort({ event_date: 1 });

      return this.utilservice.buildApiResponse({
        data: events,
        message: "Events retrieved successfully",
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      console.error("Error listing events:", error);
      throw error;
    }
  }
}

export const eventService = new EventService();
