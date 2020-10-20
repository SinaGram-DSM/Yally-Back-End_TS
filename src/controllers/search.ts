import { Request, Response, NextFunction } from "express";
import * as searchService from "../services/search";

export const searchPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const hashtag: any = req.query.hashtag;
  const userEmail: string = req["decoded"].identity;
  const page: any = req.query.page;
  const posts = await searchService.getSearch(userEmail, page, hashtag);
  res.status(200).json({ posts });
};
