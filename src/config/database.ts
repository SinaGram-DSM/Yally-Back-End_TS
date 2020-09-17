import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname + "../../../.env") });

export const config = {
  test_module: false,
  database: {
    host: process.env.HOST || "",
    port: 3306,
    user: process.env.NAME || "",
    password: process.env.PASSWORD || "",
    name: process.env.DBNAME || "",
  },
};
