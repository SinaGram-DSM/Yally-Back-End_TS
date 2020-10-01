import { Request, Response, NextFunction } from "express";
import * as commentService from "../services/comment";

export const writeComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sound: any = req.file;
  const content: string = req.body.content;
  const userEmail: string = req["decoded"].identity;
  const postId: string = req.params.id;
  if (sound)
    await commentService.write(sound["key"], content, userEmail, postId);
  else await commentService.write(null, content, userEmail, postId);
  res.status(201).end();
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const commentId: string = req.params.id;
  await commentService.deleteComment(commentId);
  res.status(204).end();
};
