import { NextFunction, Request, Response } from 'express'
import methods, { Method, MethodStatus } from './methods'

type ResponseFunction = { [key in MethodStatus]: (status: number, message: string, meta?: any) => void }

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
    formatter[method.status] = (status: number, message: string, meta?: any) => {
      responseBody = _generateResponseStory({ status, message, meta })
      res.status(method.status).json(responseBody)
    }
  })

  return formatter
}

interface ResponseStory {
  status: number
  message: string
  meta: any
}

const _generateResponseStory = ({ status, message, meta }: ResponseStory) => ({
  status,
  message,
  meta
})
