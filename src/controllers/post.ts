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
  else await postService.writeOne(req.body as IPostWriteDTO, null, userEmail);
  res.status(201).end();
};

export const detailPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId: string = req.params.id;
  const userEmail: string = req["decoded"].identity;
  const post = await postService.showOne(postId, userEmail);
  res.status(200).json(post);
};

export const showComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId: string = req.params.id;
  const comment = await postService.showComment(postId);
  res.status(200).json({ comments: comment });
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId: string = req.params.id;
  await postService.deletePost(postId);
  res.status(204).end();
};

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId: string = req.params.id;
  const img: any = req.file;
  const sound: string = req.body.sound;
  if (!sound) throw new HttpError(400);
  if (img)
    await postService.updatePost(req.body as IPostWriteDTO, img["key"], postId);
  else await postService.updatePost(req.body as IPostWriteDTO, null, postId);
  res.status(201).end();
};
