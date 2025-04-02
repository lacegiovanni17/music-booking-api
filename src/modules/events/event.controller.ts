import { Request, Response, NextFunction } from "express";
import { eventService } from "./event.service";
import { IEventCreateRequest } from "./event.interface";
import User from "../users/user.model";
import { UserRoles } from "../users/user.enum";
import HttpException from "../../utils/exceptions/http.exception";

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const organizerId = (req as unknown as { user?: { user_id: string } }).user?.user_id;
    if (!organizerId) {
      throw new HttpException(403, "Authentication required");
    }

    const organizer = await User.findById(organizerId);
    if (!organizer || organizer.user_role !== UserRoles.ORGANIZER) {
      throw new HttpException(403, "Only organizers can create events");
    }

    const response = await eventService.createEvent(req.body, organizerId);
    res.json(response);
  } catch (error: any) {
    next(new HttpException(error?.status || 500, error.message));
  }
};

/**
 * Get event details by ID
 */
export const getEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eventId = req.params.id;
    const response = await eventService.getEventById(eventId);
    res.json(response);
  } catch (error:any) {
    next(new HttpException(error?.status || 500, error.message));
  }
};

/**
 * Update an existing event (Organizer only)
 */
export const updateEvent = async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
  try {
    const eventId = req.params.id;
    const organizerId:any = (req as unknown as { user?: { user_id: string } }).user?.user_id;
    
    // Verify the user is an organizer
    const organizer = await User.findById(organizerId);
    if (!organizer || organizer.user_role !== UserRoles.ORGANIZER) {
      return res.status(403).json({
        success: false,
        message: "Only organizers can update events",
        statusCode: 403,
        data: null
      });
    }

    const response = await eventService.updateEvent(
      eventId,
      req.body,
      organizerId
    );
    res.json(response);
  } catch (error:any) {
    next(error);
  }
};

/**
 * Delete an event (Organizer only)
 */
export const deleteEvent = async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
  try {
    const eventId = req.params.id;
    const organizerId:any = (req as unknown as { user?: { user_id: string } }).user?.user_id;
    
    // Verify the user is an organizer
    const organizer = await User.findById(organizerId);
    if (!organizer || organizer.user_role !== UserRoles.ORGANIZER) {
      return res.status(403).json({
        success: false,
        message: "Only organizers can delete events",
        statusCode: 403,
        data: null
      });
    }

    const response = await eventService.deleteEvent(
      eventId,
      organizerId
    );
    res.json(response);
  } catch (error:any) {
    next(new HttpException(error?.status || 500, error.message));
  }
};

/**
 * List events with optional filters
 */
export const listEvents = async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
  try {
    const queryParams = req.query;
    const response = await eventService.listEvents(queryParams);
    res.json(response);
  } catch (error:any) {
    next(new HttpException(error?.status || 500, error.message));
  }
};

/**
 * Get events for a specific organizer
 */
export const getOrganizerEvents = async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
  try {
    const organizerId = req.params.organizerId;
    
    // Verify the organizer exists
    const organizer = await User.findById(organizerId);
    if (!organizer || organizer.user_role !== UserRoles.ORGANIZER) {
      return res.status(404).json({
        success: false,
        message: "Organizer not found",
        statusCode: 404,
        data: null
      });
    }

    const response = await eventService.listEvents({
      organizer_id: organizerId
    });
    res.json(response);
  } catch (error:any) {
    next(new HttpException(error?.status || 500, error.message));
  }
};

/**
 * Get events for a specific artist
 */
export const getArtistEvents = async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
  try {
    const artistId = req.params.artistId;
    
    // Verify the artist exists
    const artist = await User.findById(artistId);
    if (!artist || artist.user_role !== UserRoles.ARTIST) {
      return res.status(404).json({
        success: false,
        message: "Artist not found",
        statusCode: 404,
        data: null
      });
    }

    const response = await eventService.listEvents({
      artist_id: artistId
    });
    res.json(response);
  } catch (error:any) {
    next(new HttpException(error?.status || 500, error.message));
  }
};
