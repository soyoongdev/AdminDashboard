import { Request, Response } from 'express'
import { Product } from '~/models/product.model'

const NAMESPACE = 'Product'

export const createNew = async (req: Request, res: Response) => {
  try {
    return res.formatter.dynamicFind({})
  } catch (error) {
    res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Get by id
export const getByID = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
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
export const updateByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const productRequest: Product = {
      productID: parseInt(id),
      categoryID: req.body.categoryID,
      inventoryID: req.body.inventoryID,
      code: req.body.code
    }
    return res.formatter.dynamicFind({})
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Delete
export const deleteByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    return res.formatter.dynamicFind({})
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}
