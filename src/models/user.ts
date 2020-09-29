import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";
import { Post } from "./post";
import { Comment } from "./comment";
import { Yally } from "./yally";

export class User extends Model {
  email: string;
  password: string;
  nickname: string;
  age: number;
  img: string;
}

User.init(
  {
    email: {
      type: Sequelize.STRING(30),
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    nickname: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    img: {
      type: Sequelize.STRING(45),
      defaultValue: "user.jpg",
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

User.hasMany(Post, { foreignKey: "userEmail", sourceKey: "email" });
Post.belongsTo(User, { foreignKey: "userEmail" });

User.hasMany(Comment, { foreignKey: "userEmail", sourceKey: "email" });
Comment.belongsTo(User, { foreignKey: "userEmail" });

User.belongsToMany(User, {
  foreignKey: "listenerEmail",
  as: "Listenings",
  through: "listen",
});
User.belongsToMany(User, {
  foreignKey: "listeningEmail",
  as: "Listeners",
  through: "listen",
});

User.hasMany(Yally, { foreignKey: "userEmail", sourceKey: "email" });
Yally.belongsTo(User, { foreignKey: "userEmail" });
