import { Request, Response, NextFunction } from "express";
import * as commentService from "../services/comment";
import { ICommentWriteDTO } from "../interfaces/IComment";
import { HttpError } from "../exception/exception";

export const writeComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userEmail: string = req["decoded"].identity;
  const postId: string = req.params.id;
  if (!Object.keys(req.body).length) throw new HttpError(400);
  await commentService.write(req.body as ICommentWriteDTO, userEmail, postId);
  res.status(201).end();
};
