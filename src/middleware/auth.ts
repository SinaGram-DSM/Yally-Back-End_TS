import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.headers["authorization"].split("Bearer ")[1];
  console.log(req.headers);
  if (!token) return res.status(403).json({ message: "로그인 되어있지 않음" });
  jwt.verify(token, req.app.get("jwt-secret"), (err, decoded) => {
    if (err) return res.status(403).json({ message: "토큰 만료됨" });
    req["decoded"] = decoded;
    next();
  });
};
