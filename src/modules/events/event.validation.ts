import Joi from "joi";
import { IEventCreateRequest, IEventUpdateRequest } from "./event.interface";

export const eventValidation = {
  createEvent: Joi.object<IEventCreateRequest>({
    title: Joi.string().required().min(3).max(100),
    description: Joi.string().required().min(10).max(1000),
    event_date: Joi.date().required().min("now"),
    location: Joi.string().required().min(3).max(100),
    artists: Joi.array().items(Joi.string().hex().length(24)).optional(),
  }),

  updateEvent: Joi.object<IEventUpdateRequest>({
    title: Joi.string().min(3).max(100).optional(),
    description: Joi.string().min(10).max(1000).optional(),
    event_date: Joi.date().min("now").optional(),
    location: Joi.string().min(3).max(100).optional(),
    artists: Joi.array().items(Joi.string().hex().length(24)).optional(),
    status: Joi.string().valid("draft", "published", "cancelled").optional(),
  }),
};
