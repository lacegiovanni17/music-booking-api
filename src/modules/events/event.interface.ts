import { Document, Types } from "mongoose";
import { EventStatus } from "./event.enum";
import { UserRoles } from "../users/user.enum";

export interface IEvent extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  event_date: Date;
  location: string;
  organizer_id: Types.ObjectId;
  artists: Types.ObjectId[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEventCreateRequest {
  title: string;
  description: string;
  event_date: Date | string;
  location: string;
  artists?: string[];
}

export interface IEventUpdateRequest {
  title?: string;
  description?: string;
  event_date?: Date | string;
  location?: string;
  artists?: string[];
  status?: EventStatus;
}

export interface IEventQueryParams {
  status?: EventStatus;
  date_from?: string;
  date_to?: string;
  location?: string;
  organizer_id?: string;
  artist_id?: string;
}
