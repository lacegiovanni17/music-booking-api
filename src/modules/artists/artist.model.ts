import mongoose, { Schema, Document } from "mongoose";
import { IArtist } from "./artist.interface";

const ArtistSchema = new Schema<IArtist>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    stage_name: { type: String, required: true },
    bio: { type: String },
    genres: { type: [String], required: true },
    social_links: {
      facebook: { type: String },
      instagram: { type: String },
      twitter: { type: String },
      youtube: { type: String },
    },
    availability: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IArtist>("Artist", ArtistSchema);
