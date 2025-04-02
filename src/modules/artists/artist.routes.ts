import { Router } from "express";
import { authenticateUser } from "../../middleware/auth.middleware";
import { createArtist, getAllArtists, getArtistProfile, updateArtistProfile } from "./artist.controller";
import validateRequest from "../../middleware/validation.middleware";
import { createArtistSchema, updateArtistSchema } from "./artist.validation";

const artistRouter = Router();

// Create artist profile
artistRouter.post("/create-artist", authenticateUser, validateRequest(createArtistSchema), createArtist);

// Update artist profile
artistRouter.put("/update-artist", authenticateUser, validateRequest(updateArtistSchema), updateArtistProfile);

// Get all artists
artistRouter.get("/getall-artists", authenticateUser, getAllArtists);

// Get artist profile by user ID (Authenticated user)
artistRouter.get("/artist-profile/:userId", authenticateUser, getArtistProfile);

export default artistRouter;
