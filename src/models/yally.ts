import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";

export class Yally extends Model {
  postId: string;
  userEmail: string;
}

Yally.init(
  {
    postId: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    userEmail: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "yally",
  }
);
