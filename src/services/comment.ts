import { ICommentWriteDTO } from "../interfaces/IComment";
import { Comment } from "../models/comment";
import uuid4 from "uuid";

const mkId = async (): Promise<string> => {
  const id = await uuid4().split("-");
  return id[2] + id[1] + id[0] + id[3] + id[4];
};

export const write = async (
  commentWriteDTO: ICommentWriteDTO,
  userEmail: string,
  postId: string
) => {
  const { sound, content } = commentWriteDTO;
  const id = await mkId();
  await Comment.create({ id, sound, content, postId, userEmail });
};
