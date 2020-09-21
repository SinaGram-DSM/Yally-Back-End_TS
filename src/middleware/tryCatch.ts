import { Request, Response, NextFunction } from "express";

interface handlerFunc {
  (req: Request, res: Response, next: NextFunction): void;
}

export class tryCatchMiddleware {
  static BadRequest = (cb: handlerFunc) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await cb(req, res, next);
      } catch (e) {
        res.status(400);
      }
    };
  };
  static NotFound = (cb: handlerFunc) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await cb(req, res, next);
      } catch (e) {
        res.status(404);
      }
    };
  };
}
