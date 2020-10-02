import { Post } from "../models/post";
import { User } from "../models/user";
import { Comment } from "../models/comment";
import { Yally } from "../models/yally";
import { Op } from "sequelize";

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

export const recommend = async (email: string): Promise<object> => {
  try {
    const user: any = await User.findOne({ where: { email } });
    const isListening = await user.getListenings();
    let userIdArr: Array<string> = [];
    for (let listening of isListening) {
      userIdArr.push(listening.email);
    }
    const friends = await User.findAll({
      where: { email: { [Op.notIn]: userIdArr } },
      attributes: ["email", "nickname", "img"],
      order: [["age", "ASC"]],
    });
    let index = friends.findIndex((i) => i["dataValues"].email === email);
    const length = friends.length;
    let min = index;
    let max = index;
    while (1) {
      if (max < length) max++;
      if (max - min === 7) break;
      if (min > 0) min--;
    }
    const arr = friends.slice(min, max);
    index = arr.findIndex((i) => i["dataValues"].email === email);
    arr.splice(index, 1);
    return arr;
  } catch (e) {
    throw e;
  }
};
