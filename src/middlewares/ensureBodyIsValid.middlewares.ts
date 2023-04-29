import { ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";

const verifyingPayload =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const payload = schema.parse(req.body);
    req.body = payload;

    return next();
  };

export default verifyingPayload;
