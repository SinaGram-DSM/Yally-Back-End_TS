import { Request, Response, NextFunction } from "express";
import { HttpError } from "../exception/exception";
import { IPostWriteDTO } from "../interfaces/IPost";
import * as postService from "../services/post";

export const writeOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userEmail: string = req["decoded"].identity;
  const img: any = req.file;
  const sound = req.body.sound;
  if (!sound) throw new HttpError(400);
  if (img)
    await postService.writeOne(
      req.body as IPostWriteDTO,
      img["key"],
      userEmail
    );
  await postService.writeOne(req.body as IPostWriteDTO, null, userEmail);
  res.status(201).end();
};
