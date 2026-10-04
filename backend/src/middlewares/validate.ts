import type { RequestHandler } from 'express';

import type { ZodType } from 'zod';

export const validateBody =
    (schema: ZodType): RequestHandler => (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({ message: 'Validation failed', issues: result.error.issues })
            return;
        }
        req.body = result.data
        next()
    }

export const validateParams =
    (schema: ZodType): RequestHandler => (req, res, next) => {
        const result = schema.safeParse(req.params);
        if (!result.success) {
            res.status(400).json({ messag: 'Validation failed', issues: result.error.issues });
            return;
        }
        next()
    }