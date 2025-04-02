import Joi from "joi";

// Validation schema for creating an artist profile
export const createArtistSchema = Joi.object({
  stage_name: Joi.string().min(2).max(100).required(),
  bio: Joi.string().max(500).optional(),
  genres: Joi.array().items(Joi.string()).min(1).required(),
  social_links: Joi.object({
    facebook: Joi.string().uri().optional(),
    instagram: Joi.string().uri().optional(),
    twitter: Joi.string().uri().optional(),
    youtube: Joi.string().uri().optional(),
  }).optional(),
  availability: Joi.boolean().optional(),
});

// Validation schema for updating an artist profile
export const updateArtistSchema = Joi.object({
  stage_name: Joi.string().min(2).max(100).optional(),
  bio: Joi.string().max(500).optional(),
  genres: Joi.array().items(Joi.string()).min(1).optional(),
  social_links: Joi.object({
    facebook: Joi.string().uri().optional(),
    instagram: Joi.string().uri().optional(),
    twitter: Joi.string().uri().optional(),
    youtube: Joi.string().uri().optional(),
  }).optional(),
  availability: Joi.boolean().optional(),
});
