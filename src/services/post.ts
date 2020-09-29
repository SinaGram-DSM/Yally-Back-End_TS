import { IPostWriteDTO } from "../interfaces/IPost";
import { Post } from "../models/post";
import { Hashtag } from "../models/hashtag";
import { User } from "../models/user";
import uuid4 from "uuid4";

const mkId = async (): Promise<string> => {
  const id = await uuid4().split("-");
  return id[2] + id[1] + id[0] + id[3] + id[4];
};

export const writeOne = async (
  postWriteDTO: IPostWriteDTO,
  img: string | null,
  userEmail: string
) => {
  const { sound, content, hashtag } = postWriteDTO;
  const id = await mkId();
  const post = await Post.create({ id, sound, content, img, userEmail });
  if (hashtag) {
    for (let hash of hashtag) {
      await Hashtag.create({ content: hash, postId: post.id });
    }
  }
};

const dummy = async () => {
  await User.findAll();
};
