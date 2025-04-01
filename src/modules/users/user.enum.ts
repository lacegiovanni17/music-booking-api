export enum UserRoles {
  ARTIST = "artist",
  ORGANIZER = "organizer",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",         // Verified user, can book or list events
  INACTIVE = "INACTIVE",     // Default state before activation
  SUSPENDED = "SUSPENDED",   // Temporarily restricted
  BANNED = "BANNED",         // Permanently blocked
  DELETED = "DELETED",       // Soft-deleted account
}
 
