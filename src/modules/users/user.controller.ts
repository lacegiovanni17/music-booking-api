import { Request, Response, NextFunction } from "express";
import { userService } from "./user.service";
import { NotFoundException } from "../../utils/exceptions/not_found.exception";
import { BadRequestsException } from "../../utils/exceptions/bad_request.exception";

// Get User Profile
export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    const response = await userService.getUserProfile(userId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Find User by Email
export const findUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.query;
    if (!email) {
      throw new BadRequestsException("Email is required");
    }
    const user = await userService.findByEmail(email as string);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Get All Users
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userService.getAllUsers();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Get All Artistes
export const getAllArtistes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userService.getAllArtistes();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Get All Organisers
export const getAllOrganisers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userService.getAllOrganisers();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Update User Profile
export const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    const userData = req.body;
    const response = await userService.updateUserProfile(userId, userData);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Get Total Artistes Count
export const totalArtistesCount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userService.totalArtistesCount();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Get Total Organisers Count
export const totalOrganisersCount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userService.totalOrganisersCount();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Get Total Users Count
export const totalUsersCount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await userService.totalUsersCount();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
