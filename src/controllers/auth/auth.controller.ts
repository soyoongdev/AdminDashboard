import { Request, Response } from 'express'
import * as logging from '~/utils/logging'

const NAMESPACE = '[controller/auth]'

// Get by id
export const login = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    return res.formatter.ok('')
  } catch (error) {
    return res.formatter.badRequest(error)
  }
}

// Get all
export const register = async (req: Request, res: Response) => {
  try {
    return res.formatter.ok('')
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    return res.formatter.badRequest(error)
  }
}
