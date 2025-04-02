import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";

function validationMiddleware(schema: Joi.Schema, target: "body" | "params" | "query" = "body"): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const validationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    try {
      const validatedData = await schema.validateAsync(req[target], validationOptions);
      req[target] = validatedData; // Attach validated data back to request
      next();
    } catch (error: any) {
      const errors = error.details.map((err: Joi.ValidationErrorItem) => err.message);
      res.status(422).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }
  };
}

export default validationMiddleware;
