import { Request, Response } from 'express'
import { Order } from '~/models/order.model'
import * as services from '~/services/order.service'

const NAMESPACE = 'Order'

export const createNew = async (req: Request, res: Response) => {
  try {
    const orderRequest: Order = {
      cartID: req.body.cartID,
      userID: req.body.userID,
      statusID: req.body.statusID,
      paymentMethodID: req.body.paymentMethodID,
      shipping: req.body.shipping,
      payment: req.body.payment,
      amount: req.body.amount,
      products: req.body.products
    }
    const orderNew = await services.createNew(orderRequest)
    return res.formatter.dynamicFind(orderNew)
  } catch (error) {
    res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Get by id
export const getByID = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const order = await services.getByID(parseInt(id))
    return res.formatter.dynamicFind(order)
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
  const orderRequest: Order = {
    orderID: parseInt(req.params.id),
    cartID: req.body.cartID,
    userID: req.body.userID,
    statusID: req.body.statusID,
    paymentMethodID: req.body.paymentMethodID,
    shipping: req.body.shipping,
    payment: req.body.payment,
    amount: req.body.amount,
    products: req.body.products
  }
  try {
    const orderFind = await services.updateByID(orderRequest)
    return res.formatter.dynamicFind(orderFind)
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Delete
export const deleteByID = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const orderFind = await services.deleteByID(parseInt(id))
    return res.formatter.dynamicFind(orderFind)
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}
