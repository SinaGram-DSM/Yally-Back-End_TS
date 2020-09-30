import { Request, Response, NextFunction } from "express";
import { getAll } from "../services/timeline";

export const getTimeline = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userEmail: string = req["decoded"].identity;
  const page: any = req.params.page;
  console.log(page);
  const timeline = await getAll(userEmail, page);
  res.status(200).json({ posts: timeline });
};
