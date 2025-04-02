import { Schema, model, Types } from "mongoose";
import { IEvent } from "./event.interface";
// import { EventStatus } from "./event.enum";

const eventSchema = new Schema<IEvent>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    event_date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    organizer_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    artists: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
    ],
    status: {
        type: String,
        enum: ["draft", "published", "cancelled"],
        default: "draft"
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
eventSchema.index({ organizer_id: 1 });
eventSchema.index({ artists: 1 });
eventSchema.index({ event_date: 1 });
eventSchema.index({ status: 1 });

export const Event = model<IEvent>("Event", eventSchema);
