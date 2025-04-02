import Artist from "./artist.model";
import { IArtist } from "./artist.interface";
import { NotFoundException } from "../../utils/exceptions/not_found.exception";
import { BadRequestsException } from "../../utils/exceptions/bad_request.exception";
import UtilService from "../../utils/services/utils.service";
import { IGenericResponseModel } from "../../utils/interfaces/generic_response.interface";

class ArtistService {
  private utilservice = new UtilService();

  // Create an artist profile
  public async createArtistProfile(userId: string, data: Partial<IArtist>): Promise<IGenericResponseModel<IArtist | null | Error>> {
    try {
      const existingArtist = await Artist.findOne({ user: userId });
      if (existingArtist) {
        return this.utilservice.buildApiErrorResponse({
          data: null,
          message: "Artist profile already exists for this user.",
          statusCode: 400,
        });
      }

      const artist = await Artist.create({ user: userId, ...data });
      return this.utilservice.buildApiResponse({
        data: artist,
        message: "Artist profile created successfully",
        statusCode: 201,
        success: true,
      });
    } catch (error) {
      console.error("Error creating artist profile:", error);
      throw error;
    }
  }

  // Get artist profile by user ID
  public async getArtistProfile(userId: string): Promise<IGenericResponseModel<IArtist | Error>> {
    try {
      const artist = await Artist.findOne({ user: userId }).populate("user");
      if (!artist) {
        throw new NotFoundException("Artist profile not found.");
      }
      return this.utilservice.buildApiResponse({
        data: artist,
        message: "Artist profile retrieved successfully",
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      console.error("Error retrieving artist profile:", error);
      throw error;
    }
  }

  // Update artist profile
  public async updateArtistProfile(userId: string, updates: Partial<IArtist>): Promise<IGenericResponseModel<IArtist>> {
    try {
      const artist = await Artist.findOneAndUpdate({ user: userId }, updates, { new: true });
      if (!artist) {
        throw new NotFoundException("Artist profile not found.");
      }
      return this.utilservice.buildApiResponse({
        data: artist,
        message: "Artist profile updated successfully",
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      console.error("Error updating artist profile:", error);
      throw error;
    }
  }

  // Get all artists
  public async getAllArtists(): Promise<IGenericResponseModel<IArtist[]>> {
    try {
      const artists = await Artist.find().populate("user");
      return this.utilservice.buildApiResponse({
        data: artists,
        message: "All artists retrieved successfully",
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      console.error("Error retrieving all artists:", error);
      throw error;
    }
  }
}

export const artistService = new ArtistService();
