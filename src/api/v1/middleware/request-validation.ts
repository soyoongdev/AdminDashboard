import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'

export const requestValidator = (validationRules: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Áp dụng các quy tắc xác nhận cho từng trường
    await Promise.all(validationRules.map((rule) => rule.run(req)))

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        message: 'Error validate request',
        data: null,
        meta: {
          errors: errors.array()
        }
      })
    }

    next()
  }
}
