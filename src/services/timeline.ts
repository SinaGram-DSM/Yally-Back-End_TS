import { Post } from "../models/post";
import { Hashtag } from "../models/hashtag";
import { User } from "../models/user";
import { Comment } from "../models/comment";
import { Yally } from "../models/yally";
import { fn, col, Op } from "sequelize";

export const getAll = async (
  userEmail: string,
  page: number
): Promise<object> => {
  try {
    const timeline: any = await Post.findAll({
      subQuery: false,
      order: [["createdAt", "DESC"]],
      where: { userEmail },
      attributes: [
        "id",
        "content",
        "sound",
        "img",
        "createdAt",
        [fn("COUNT", col("comments.id")), "comment"],
        [fn("COUNT", col("yallies.userEmail")), "yally"],
      ],
      include: [
        {
          model: User,
          attributes: ["email", "nickname", "img"],
        },
        {
          model: Comment,
          attributes: [],
        },
        {
          model: Yally,
          attributes: [],
        },
      ],
      offset: 7 * (page - 1),
      limit: 7,
    });

    return timeline;
  } catch (e) {
    throw e;
  }
};
