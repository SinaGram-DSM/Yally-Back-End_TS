import { ICommentWriteDTO } from "../interfaces/IComment";
import { Comment } from "../models/comment";
import uuid4 from "uuid";
import { HttpError } from "../exception/exception";

const mkId = async (): Promise<string> => {
  const id = await uuid4().split("-");
  return id[2] + id[1] + id[0] + id[3] + id[4];
};

export const write = async (
  sound: string | null,
  content: string,
  userEmail: string,
  postId: string
) => {
  if (!sound && !content) throw new HttpError(400);
  const id = await mkId();
  await Comment.create({ id, sound, content, postId, userEmail });
};

export const deleteComment = async (id: string) => {
  await Comment.destroy({ where: { id } });
};
