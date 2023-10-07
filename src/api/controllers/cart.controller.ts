import { Request, Response } from 'express'
import CartSchema, { Cart } from '~/models/cart.model'
import * as services from '~/services/cart.service'

const NAMESPACE = 'controllers/cart'

export const addToCart = async (req: Request, res: Response) => {
  try {
    const cartRequest: Cart = {
      userID: req.body.userID,
      status: req.body.status,
      modifiedOn: req.body.modifiedOn,
      orderNumber: req.body.orderNumber,
      products: req.body.products
    }
    const cartToUpdate = await CartSchema.findOne({ where: { userID: cartRequest.userID } })
    if (cartToUpdate) {
      await services
        .updateCartByUserID(cartRequest)
        .then((resStory) => {
          // story = await services.updateByUserID(cartRequest)
          return res.formatter.ok(resStory)
        })
        .catch((err: Error) => {
          return res.formatter.badRequest({ message: err.message })
        })
      // return res.formatter.ok({ data: cartToUpdate })
    } else {
      // ADD NEW CART
      await services
        .addToCart(cartRequest)
        .then((cart) => {
          return res.formatter.created({
            message: 'Cart added successfully',
            data: cart
          })
        })
        .catch((err: Error) => {
          return res.formatter.badRequest({ message: err.message })
        })
      return res.formatter.badRequest({ message: `Can not find cart to update!` })
    }
  } catch (error) {
    res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Get by id
export const getByUserID = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const cartFound = await services.getByUserID(parseInt(id))
    if (cartFound) {
      return res.formatter.ok({ data: cartFound })
    } else {
      return res.formatter.notFound({})
    }
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
