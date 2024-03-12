import { Request, Response } from "express";
import prisma from "../config/db.config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CustomRequest } from "middleware/Authenticate.js";

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

class UserController {
  static async index(req: CustomRequest, res: Response) {
    return res.json(req["user"]);
  }

  static async refreshToken(req: CustomRequest, res: Response) {
    const findUser = await prisma.user.findUnique({
      where: {
        email: req.user?.email!,
      },
    });
    if (findUser) {
      // * Issue token to user
      const payloadData = {
        id: findUser.id,
        name: findUser.name,
        email: findUser.email,
      };
      const access_token = jwt.sign(payloadData, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });
      return res.json({
        access_token: access_token,
      });
    }

    return res.status(401).json({ message: "No user found" });
  }

  static async register(req: Request, res: Response) {
    const payload: RegisterPayload = await req.body;
    //   * Check if email exist
    const findUser = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (findUser) {
      return res.status(400).json({
        errors: {
          email: "Email already taken.please use another one.",
        },
      });
    }
    //   * Encrypt the password
    const salt = bcrypt.genSaltSync(10);
    payload.password = bcrypt.hashSync(payload.password, salt);

    const user = await prisma.user.create({
      data: payload,
    });
    return res.json({
      status: 200,
      message: "User created successfully",
      user,
    });
  }

  static async login(req: Request, res: Response) {
    const payload: LoginPayload = await req.body;
    const findUser = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (findUser) {
      if (!bcrypt.compareSync(payload.password, findUser.password)) {
        return res.status(400).json({
          errors: {
            email: "Invalid Credentials.",
          },
        });
      }

      // * Issue token to user
      const payloadData = {
        id: findUser.id,
        name: findUser.name,
        email: findUser.email,
      };
      const token = jwt.sign(payloadData, process.env.JWT_SECRET!, {
        expiresIn: "2h",
      });
      const refresh_token = jwt.sign(payloadData, process.env.JWT_SECRET!, {
        expiresIn: "365d",
      });

      return res.json({
        message: "Logged in",
        access_token: token,
        refresh_token,
        user: payloadData,
      });
    }
  }
}

export default UserController;
