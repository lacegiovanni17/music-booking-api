import mongoose, { Schema, Document } from "mongoose";
import { IArtist } from "./artist.interface";

const ArtistSchema = new Schema<IArtist>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    stage_name: { type: String, required: true },
    bio: { type: String, default: null },  // Nullable bio field, defaults to null
    genres: { type: [String], required: true, default: [] },  // Ensure empty array for genres if not provided
    social_links: {
      facebook: { type: String, default: null },  // Nullable, defaults to null if not provided
      instagram: { type: String, default: null },  // Nullable, defaults to null if not provided
      twitter: { type: String, default: null },  // Nullable, defaults to null if not provided
      youtube: { type: String, default: null },  // Nullable, defaults to null if not provided
    },
    availability: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IArtist>("Artist", ArtistSchema);
