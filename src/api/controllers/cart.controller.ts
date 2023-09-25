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

    return res.formatter.dynamicFind(await services.createNew(cartRequest))
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
