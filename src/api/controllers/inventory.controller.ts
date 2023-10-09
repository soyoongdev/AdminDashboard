import { Request, Response } from 'express'

const NAMESPACE = 'Inventory'

export const createNew = async (req: Request, res: Response) => {
  try {
    return res.formatter.dynamicFind({})
  } catch (error) {
    res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Get by id
export const getByID = async (req: Request, res: Response) => {
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

// Update
export const updateByProductID = async (req: Request, res: Response) => {
  try {
    return res.formatter.dynamicFind({})
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Delete
export const deleteByID = async (req: Request, res: Response) => {
  try {
    return res.formatter.dynamicFind({})
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}
