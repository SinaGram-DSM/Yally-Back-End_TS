import { Request, Response, NextFunction } from "express";
import * as searchService from "../services/search";

export const searchPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const hashtag: string = req.params.hashtag;
  const userEmail: string = req["decoded"].identity;
  const page: any = req.params.page;
  const posts = await searchService.getSearch(userEmail, page, hashtag);
  res.status(200).json({ posts });
};
