import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";

export class Comment extends Model {
  id: string;
  postId: string;
  userEmail: string;
  content: number;
  sound: string;
}

Comment.init(
  {
    id: {
      type: Sequelize.STRING(40),
      primaryKey: true,
    },
    content: {
      type: Sequelize.STRING(100),
    },
    sound: {
      type: Sequelize.STRING(20),
    },
  },
  {
    sequelize,
    modelName: "Comment",
  }
);
