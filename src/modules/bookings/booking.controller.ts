import { Request, Response, NextFunction } from "express";
import { bookingService } from "./booking.service";

export const createBooking = async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
  try {
    const organizerId:any = (req as unknown as { user?: { user_id: string } }).user?.user_id;
    if (!organizerId) {
      return res.status(403).json({
        success: false,
        message: "Authentication required",
        statusCode: 403,
        data: null
      });
    }

    const response = await bookingService.createBooking(req.body, organizerId);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getBooking = async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
  try {
    const bookingId = req.params.id;
    const userId:any = (req as unknown as { user?: { user_id: string } }).user?.user_id;

    if (!userId) {
      return res.status(403).json({
        success: false,
        message: "Authentication required",
        statusCode: 403,
        data: null
      });
    }

    const response = await bookingService.getBookingById(bookingId);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const updateBooking = async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
  try {
    const bookingId = req.params.id;
    const userId:any = (req as unknown as { user?: { user_id: string } }).user?.user_id;

    if (!userId) {
      return res.status(403).json({
        success: false,
        message: "Authentication required",
        statusCode: 403,
        data: null
      });
    }

    const response = await bookingService.updateBooking(bookingId, req.body, userId);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const listBookings = async (req: Request, res: Response, next: NextFunction): Promise<void | any>  => {
  try {
    const userId:any = (req as unknown as { user?: { user_id: string } }).user?.user_id;
    const queryParams = req.query;

    if (!userId) {
      return res.status(403).json({
        success: false,
        message: "Authentication required",
        statusCode: 403,
        data: null
      });
    }

    const response = await bookingService.listBookings(queryParams, userId);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
