import { Request, Response, NextFunction } from "express";
import { artistService } from "./artist.service";
import HttpException from "../../utils/exceptions/http.exception";
import { IArtist } from "./artist.interface";


// Create artist profile (Only if additional setup is needed beyond user registration)
export async function createArtist(req: Request, res: Response, next: NextFunction) {
  try {
    const authReq = req as Request & { user: { user_id: string } }; // Type assertion

    if (!authReq.user) {
      throw new HttpException(401, "Unauthorized: No user found in request");
    }

    const response = await artistService.createArtistProfile(authReq.user.user_id, req.body);
    res.json(response);
  } catch (error: any) {
    next(new HttpException(error?.status || 500, error.message));
  }
}

// Update artist profile
export async function updateArtistProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const authReq = req as Request & { user: { user_id: string } }; // Type assertion

    if (!authReq.user) {
      throw new HttpException(401, "Unauthorized: No user found in request");
    }

    const response = await artistService.updateArtistProfile(authReq.user.user_id, req.body);
    res.json(response);
  } catch (error: any) {
    next(new HttpException(error?.status || 500, error.message));
  }
}


// Get artist profile by user ID
export async function getArtistProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const authReq = req as Request & { user: { user_id: string } }; // Type assertion

    if (!authReq.user) {
      throw new HttpException(401, "Unauthorized: No user found in request");
    }

    const response = await artistService.getArtistProfile(authReq.user.user_id);
    res.json(response);
  } catch (error: any) {
    next(new HttpException(error?.status || 500, error.message));
  }
}

// Get all artists
export async function getAllArtists(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await artistService.getAllArtists();
    res.json(response);
  } catch (error: any) {
    next(new HttpException(error?.status || 500, error.message));
  }
}
