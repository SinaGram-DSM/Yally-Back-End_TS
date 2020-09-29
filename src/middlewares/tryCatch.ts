import { Request, Response, NextFunction } from "express";

interface handlerFunc {
  (req: Request, res: Response, next: NextFunction): void;
}

export class tryCatchMiddleware {
  static Error = (cb: handlerFunc) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await cb(req, res, next);
      } catch (e) {
        console.log(e);
        res.status(e.statusCode || 500).end();
      }
    };
  };
}
