import { Post } from "../models/post";
import { User } from "../models/user";
import { Comment } from "../models/comment";
import { Yally } from "../models/yally";

export const getAll = async (
  userEmail: string,
  page: number
): Promise<object> => {
  try {
    const timeline: any = await Post.findAll({
      subQuery: false,
      order: [["createdAt", "DESC"]],
      where: { userEmail },
      attributes: ["id", "content", "sound", "img", "createdAt"],
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
      offset: 5 * (page - 1),
      limit: 5,
    });
    for (let post of timeline) {
      post["dataValues"].comment = post["dataValues"].comments.length;
      post["dataValues"].yally = post["dataValues"].yallies.length;
      post["dataValues"].isYally = false;
      if (post["dataValues"].user.email === userEmail)
        post["dataValues"].isMine = true;
      else post["dataValues"].isMine = false;
      for (let yally of post.yallies) {
        if (yally.userEmail === userEmail) post["dataValues"].isYally = true;
      }
    }

    return timeline;
  } catch (e) {
    throw e;
  }
};
