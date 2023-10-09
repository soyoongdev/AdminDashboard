import { Request, Response } from 'express'

const NAMESPACE = 'controllers/cart'

export const addToCart = async (req: Request, res: Response) => {
  try {
    return res.formatter.dynamicFind({})
  } catch (error) {
    res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Get by id
export const getByUserID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    return res.formatter.dynamicFind({})
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Get all
export const getAll = async (req: Request, res: Response) => {
  try {
    return res.formatter.dynamicFind({})
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Delete
export const deleteByUserID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    return res.formatter.dynamicFind({})
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}
