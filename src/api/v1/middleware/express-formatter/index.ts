import { NextFunction, Request, Response } from 'express'
import methods, { Method, MethodType } from './methods'

type ResponseFunction = {
  [key in MethodType]: (data?: any | undefined, meta?: any | undefined, message?: string | undefined) => void
}

declare global {
  namespace Express {
    interface Response {
      formatter: ResponseFunction
    }
  }
}

export const responseEnhancer =
  () =>
  (req: Request, res: Response, next: NextFunction): void => {
    res.formatter = _generateFormatters(res)
    next()
  }

const _generateFormatters = (res: Response) => {
  const formatter = {} as ResponseFunction
  let responseBody = {}

  methods.map((method: Method) => {
    formatter[method.type] = (data?: any, meta?: any, message?: string | undefined) => {
      responseBody = _generateResponseStory({
        status: method.status,
        message: message === undefined ? method.message : message,
        data: data,
        meta: meta
      })
      res.status(method.status).json(responseBody)
    }
  })

  return formatter
}

// Custom response here!!!!
interface ResponseStory {
  status: number
  message?: string | undefined
  data?: any
  meta?: any
}

const _generateResponseStory = ({ status, message, data, meta }: ResponseStory) => ({
  status,
  message,
  data,
  meta
})
