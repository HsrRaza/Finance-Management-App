import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models";
import { ApiError } from "../utils/ApiError";
import { env } from "../config/env";

export class AuthService {
  static generateToken(userId: string): string {
    const secret = process.env.ACCESS_TOKEN_SECRET || env.JWT_SECRET;
    return jwt.sign({ user: userId }, secret, { expiresIn: "7d" });
  }

  static async signup(payload: { name: string; email: string; password: string }) {
    const { name, email, password } = payload;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.generateToken(user._id.toString());

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
      token,
    };
  }

  static async login(payload: { email: string; password: string }) {
    const { email, password } = payload;

    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ApiError(400, "Invalid email or password");
    }

    const token = this.generateToken(user._id.toString());

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
      token,
    };
  }

  static async getUserProfile(userId: string) {
    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return user;
  }
}
