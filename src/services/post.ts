import { IPostWriteDTO } from "../interfaces/IPost";
import { Post } from "../models/post";
import { Hashtag } from "../models/hashtag";
import { User } from "../models/user";
import { Yally } from "../models/yally";
import { Comment } from "../models/comment";
import uuid4 from "uuid4";
import { HttpError } from "../exception/exception";

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

export const showOne = async (
  id: string,
  userEmail: string
): Promise<object> => {
  try {
    const post: any = await Post.findOne({
      where: { id },
      attributes: ["content", "sound", "img", "createdAt"],
      include: [
        {
          model: User,
          attributes: ["email", "nickname", "img"],
        },
        {
          model: Comment,
          attributes: ["id"],
        },
        {
          model: Yally,
          attributes: ["userEmail"],
        },
      ],
    });
    post["dataValues"].comment = post["dataValues"].comments.length;
    post["dataValues"].yally = post["dataValues"].yallies.length;
    post["dataValues"].isYally = false;
    if (post["dataValues"].user.email === userEmail)
      post["dataValues"].isMine = true;
    else post["dataValues"].isMine = false;
    for (let yally of post.yallies) {
      if (yally.userEmail === userEmail) post["dataValues"].isYally = true;
    }

    return post;
  } catch (e) {
    throw new HttpError(404);
  }
};

export const showComment = async (
  postId: string,
  userEmail: string
): Promise<object> => {
  try {
    const comments: any = await Comment.findAll({
      where: { postId },
      order: [["createdAt", "DESC"]],
      attributes: ["id", "content", "sound", "createdAt"],
      include: [
        {
          model: User,
          attributes: ["email", "nickname", "img"],
        },
      ],
    });
    for (let comment of comments) {
      comment["dataValues"].isMine = false;
      if (comment.user.email === userEmail) comment["dataValues"].isMine = true;
    }
    return comments;
  } catch (e) {
    throw e;
  }
};

export const deletePost = async (postId: string) => {
  try {
    await Post.destroy({ where: { id: postId } });
  } catch (e) {
    throw new HttpError(404);
  }
};

export const updatePost = async (
  postWriteDTO: IPostWriteDTO,
  img: string | null,
  postId: string
) => {
  const { sound, content, hashtag } = postWriteDTO;
  await Post.update({ sound, content, img }, { where: { id: postId } });
  await Hashtag.destroy({ where: { postId } });
  if (hashtag) {
    for (let hash of hashtag) {
      await Hashtag.create({ content: hash, postId });
    }
  }
};
