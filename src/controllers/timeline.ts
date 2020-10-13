import { Request, Response, NextFunction } from "express";
import * as timelineService from "../services/timeline";

export const getTimeline = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userEmail: string = req["decoded"].identity;
  const page: any = req.params.page;
  const timeline = await timelineService.getAll(userEmail, page);
  res.status(200).json({ posts: timeline });
};

export const recommendFriends = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userEmail: string = req["decoded"].identity;
  const friends = await timelineService.recommend(userEmail);
  res.status(200).json({ friends });
};
