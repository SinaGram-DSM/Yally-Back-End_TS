import { HttpError } from "../exception/exception";
import { Yally } from "../models/yally";

export const addOne = async (postId: string, userEmail: string) => {
  try {
    await Yally.create({ postId, userEmail });
  } catch (e) {
    throw new HttpError(400);
  }
};

export const cancelOne = async (postId: string, userEmail: string) => {
  try {
    await Yally.destroy({ where: { postId, userEmail } });
  } catch (e) {
    throw new HttpError(404);
  }
};
