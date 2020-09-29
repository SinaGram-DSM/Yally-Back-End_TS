import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";
import { Comment } from "./comment";

export class Post extends Model {
  id: string;
  content: string;
  img: string;
  sound: string;
  userEmail: string;
}

Post.init(
  {
    id: {
      type: Sequelize.STRING(40),
      primaryKey: true,
    },
    content: {
      type: Sequelize.STRING(100),
    },
    img: {
      type: Sequelize.STRING(40),
    },
    sound: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Post",
  }
);

Post.hasMany(Comment, { foreignKey: "postId", sourceKey: "id" });
Comment.belongsTo(Post, { foreignKey: "postId" });
