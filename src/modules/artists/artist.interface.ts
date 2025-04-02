import { Types } from "mongoose";

export interface IArtist {
  user: Types.ObjectId;
  stage_name: string;
  bio?: string;
  genres: string[];
  social_links?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  availability: boolean;
  createdAt: Date;
  updatedAt: Date;
}
