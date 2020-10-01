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
      offset: 5 * (page - 1),
      limit: 5,
      include: [
        {
          model: User,
          attributes: ["email", "nickname", "img"],
        },
        // {
        //   model: Comment,
        //   attributes: ["id"],
        // },
        // {
        //   model: Yally,
        //   attributes: ["userEmail"],
        // },
      ],
    });
    for (let post of timeline) {
      const comments = await Comment.findAll({ where: { postId: post.id } });
      const yallies = await Yally.findAll({ where: { postId: post.id } });
      post["dataValues"].comment = comments.length;
      post["dataValues"].yally = yallies.length;
      post["dataValues"].isYally = false;
      if (post["dataValues"].user.email === userEmail)
        post["dataValues"].isMine = true;
      else post["dataValues"].isMine = false;
      for (let yally of yallies) {
        if (yally.userEmail === userEmail) post["dataValues"].isYally = true;
      }
    }

    return timeline;
  } catch (e) {
    throw e;
  }
};
