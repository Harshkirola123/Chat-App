import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import prisma from "../../config/prisma.config";
import { accessTokenGenerate, refreshTokenGenerate } from "./token.generate";

interface JwtPayload {
  _id: string;
  email: string;
  name: string;
}

const tokenGenerate = asyncHandler(async (req: Request, res: Response) => {
  try {
    // Extract refresh token from cookies
    const refToken = req.cookies.refreshToken;

    // Clear the existing refresh token cookie
    res.clearCookie("refreshToken");

    if (!refToken) {
      res.status(400).json({ message: "Refresh token not found" });
      return;
    }

    // Verify the refresh token
    const decoded = jwt.verify(
      refToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as JwtPayload;

    // Find the user associated with the token
    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Generate a new access token and refresh token
    const accessToken = accessTokenGenerate(user.id, user.username, user.email);
    const refreshToken = refreshTokenGenerate(
      user.id,
      user.username,
      user.email
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "none", // Allow cross-origin requests
    });

    res.status(200).json({
      message: "Token generated successfully",
      data: {
        user: {
          id: user.id,
          name: user.username,
          email: user.email,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    // Handle token verification or other errors
    console.error(error);
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
});

export default tokenGenerate;
