import { Types } from "mongoose";

export interface IArtist {
  user: Types.ObjectId;
  stage_name: string;
  bio?: string | null;
  genres: string[];
  social_links?: {
    facebook?: string | null;
    instagram?: string | null;
    twitter?: string | null;
    youtube?: string | null;
  };
  availability: boolean;
  createdAt: Date;
  updatedAt: Date;
}
