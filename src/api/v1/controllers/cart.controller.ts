import { Request, Response } from 'express'
import { Cart } from '~/v1/models/cart.model'
import * as services from '~/v1/services/cart.service'

const NAMESPACE = 'Cart'

export const createNew = async (req: Request, res: Response) => {
  try {
    const cartRequest: Cart = {
      userID: req.body.userID,
      status: req.body.status,
      products: req.body.products
    }

    const cartNew = await services.createNew(cartRequest)
    return res.formatter.dynamicFind(cartNew)
  } catch (error) {
    res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Get by id
export const getByID = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const cart = await services.getByID(parseInt(id))
    return res.formatter.dynamicFind(cart)
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Get all
export const getAll = async (req: Request, res: Response) => {
  try {
    const inventories = await services.getAll()
    return res.formatter.dynamicFind(inventories)
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Update
export const updateByID = async (req: Request, res: Response) => {
  const cartRequest: Cart = {
    cartID: parseInt(req.params.id),
    userID: req.body.userID,
    status: req.body.status,
    modifiedOn: req.body.modifiedOn,
    products: req.body.products
  }
  try {
    const cartFind = await services.updateByID(cartRequest)
    return res.formatter.dynamicFind(cartFind)
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Delete
export const deleteByID = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const cartFind = await services.deleteByID(parseInt(id))
    return res.formatter.dynamicFind(cartFind)
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}
