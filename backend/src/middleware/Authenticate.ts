import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export type CustomRequest = Request & {
  user?: User;
};

export type User = {
  id: number;
  name: string;
  email: string;
};

const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader === null || authHeader === undefined) {
    return res.status(401).json({ status: 401, message: "UnAuthorized" });
  }
  const token = authHeader.split(" ")[1];

  //   * Verify the JWT token
  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err)
      return res.status(401).json({ status: 401, message: "UnAuthorized" });
    req.user = user as User;
    next();
  });
};

export default authMiddleware;
