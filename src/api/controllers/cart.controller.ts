import { Request, Response } from 'express'
import { Cart } from '~/models/cart.model'
import * as services from '~/services/cart.service'

const NAMESPACE = 'controllers/cart'

export const addToCart = async (req: Request, res: Response) => {
  try {
    const cartRequest: Cart = {
      userID: req.body.userID,
      status: req.body.status,
      products: req.body.products
    }
    const cart = await services.getByUserID(cartRequest.userID)
    
    if (cart.status === 200) {
      res.formatter.dynamicFind(await services.updateByUserID(cartRequest))
    } else {
      res.formatter.dynamicFind(await services.addToCart(cartRequest))
    }
  } catch (error) {
    res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Get by id
export const getByUserID = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    return res.formatter.dynamicFind(await services.getByUserID(parseInt(id)))
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Get all
export const getAll = async (req: Request, res: Response) => {
  try {
    return res.formatter.dynamicFind(await services.getAll())
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Update
export const updateByUserID = async (req: Request, res: Response) => {
  const cartRequest: Cart = {
    userID: req.body.userID,
    status: req.body.status,
    modifiedOn: req.body.modifiedOn,
    products: req.body.products
  }
  try {
    return res.formatter.dynamicFind(await services.updateByUserID(cartRequest))
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Delete
export const deleteByUserID = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const cartFind = await services.deleteByUserID(parseInt(id))
    return res.formatter.dynamicFind(cartFind)
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}
