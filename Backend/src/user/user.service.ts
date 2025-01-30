import prisma from "../config/prisma.config";
import {
  accessTokenGenerate,
  refreshTokenGenerate,
} from "../common/helper/token.generate";
import bcrypt from "bcryptjs";

export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    console.log(email);
    if (existingUser) {
      return {
        status: 400,
        message: "User already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    const accessToken = accessTokenGenerate(user.id, user.username, user.email);
    const refreshToken = refreshTokenGenerate(
      user.id,
      user.username,
      user.email
    );

    const sanitizedUser = { ...user, password: undefined };

    return {
      status: 200,
      message: "User created successfully",
      data: {
        user: sanitizedUser,
        token: accessToken,
        refreshToken,
      },
    };
  } catch (e) {
    console.error("Error in createUser: ");
    return {
      status: 500,
      message: "Internal server error. Please try again later.",
    };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    // console.log(email);
    if (!user) {
      return {
        status: 400,
        message: "Invalid email or password",
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        status: 400,
        message: "Invalid email or password",
      };
    }

    const accessToken = accessTokenGenerate(user.id, user.username, user.email);
    const refreshToken = refreshTokenGenerate(
      user.id,
      user.username,
      user.email
    );

    const sanitizedUser = { ...user, password: undefined };

    return {
      status: 200,
      message: "Login successful",
      data: {
        user: sanitizedUser,
        token: accessToken,
        refreshToken,
      },
    };
  } catch (e) {
    console.error("Error in loginUser: ");
    return {
      status: 500,
      message: "Internal server error. Please try again later.",
    };
  }
};
