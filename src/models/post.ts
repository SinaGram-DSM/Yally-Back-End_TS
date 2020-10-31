import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";
import { Comment } from "./comment";
import { Hashtag } from "./hashtag";
import { Yally } from "./yally";

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
      defaultValue: "post.jpg"
    },
    sound: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    modelName: "post",
  }
);

Post.hasMany(Comment, { foreignKey: "postId", sourceKey: "id" });
Comment.belongsTo(Post, { foreignKey: "postId" });

Post.hasMany(Hashtag, { foreignKey: "postId", sourceKey: "id" });
Hashtag.belongsTo(Post, { foreignKey: "postId" });

Post.hasMany(Yally, { foreignKey: "postId", sourceKey: "id" });
Yally.belongsTo(Post, { foreignKey: "postId" });
