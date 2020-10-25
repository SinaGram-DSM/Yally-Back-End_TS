import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";

export class Hashtag extends Model {
  postId: string;
  content: string;
}

Hashtag.init(
  {
    content: {
      type: Sequelize.STRING(100),
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "hashtag",
  }
);
