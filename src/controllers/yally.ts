import { Request, Response, NextFunction } from "express";
import * as yallyService from "../services/yally";

export const addYally = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId = req.body.id;
  const userEmail = req["decoded"].identity;
  await yallyService.addOne(postId, userEmail);
  res.status(200).end();
};

export const calcelYally = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId: string = req.body.id;
  const userEmail: string = req["decoded"].identity;
  await yallyService.cancelOne(postId, userEmail);
  res.status(204).end();
};
