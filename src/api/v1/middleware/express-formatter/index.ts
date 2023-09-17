import { NextFunction, Request, Response } from 'express'
import methods, { Method, MethodType } from './methods'

export interface ResponseStory {
  status?: number
  message?: string
  data?: any
  meta?: any
}

type ResponseFunction = {
  [key in MethodType]: (response: ResponseStory) => void
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

  methods.map((method: Method) => {
    formatter[method.type] = (response: ResponseStory) => {
      if (method.type === 'dynamicFind') {
        const foundMethod = methods.find((m) => m.status === response.status)
        if (foundMethod) {
          _generateResponseStory(res, {
            status: foundMethod.status,
            message: response.message ? response.message : foundMethod.message,
            data: response.data,
            meta: response.meta
          })
        } else {
          res.status(500).json({
            status: 500,
            message: 'Can not find the requested status method!'
          })
        }
      } else {
        _generateResponseStory(res, {
          status: method.status,
          message: response.message ? response.message : method.message,
          data: response.data,
          meta: response.meta
        })
      }
    }
  })

  return formatter
}

const _generateResponseStory = (res: Response, story: ResponseStory) => {
  if (story.status) {
    res.status(story.status).json(story)
  } else {
    res.status(500).json({ status: 500, message: 'Generate body error!' })
  }
}
