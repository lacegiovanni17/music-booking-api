import express from "express";
import {
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  listEvents,
  getOrganizerEvents,
  getArtistEvents
} from "./event.controller";
import { authorizeRoles, authenticateUser } from "../../middleware/auth.middleware";
import { UserRoles } from "../users/user.enum";
import validateRequest from "../../middleware/validation.middleware";
import { eventValidation } from "./event.validation";

const eventRouter = express.Router();

// Create event (Organizer only)
eventRouter.post(
  "/create-event",
  authenticateUser,
  authorizeRoles(UserRoles.ORGANIZER),
  validateRequest(eventValidation.createEvent),
  createEvent
);

eventRouter.get("/get/:id", getEvent);

eventRouter.put(
  "/update-event/:id",
  authenticateUser,
  authorizeRoles([UserRoles.ORGANIZER]),
  validateRequest(eventValidation.updateEvent),
  updateEvent
);

eventRouter.delete(
  "/delete/:id",
  authenticateUser,
  authorizeRoles([UserRoles.ORGANIZER]),
  deleteEvent
);

eventRouter.get("/listevents", listEvents);
eventRouter.get("/organizer/:organizerId", getOrganizerEvents);
eventRouter.get("/artist/:artistId", getArtistEvents);

export default eventRouter;
