import { Request, Response, NextFunction } from "express";
import { IPostWriteDTO } from "../interfaces/IPost";
import * as postService from "../services/post";

export const writeOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userEmail: string = req["decoded"].identity;
  const img: string = req.file["key"];
  await postService.writeOne(req.body as IPostWriteDTO, img, userEmail);
  res.status(201).end();
};
