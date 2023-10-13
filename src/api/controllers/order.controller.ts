import { Request, Response } from 'express'
import * as services from '~/services/order.service'

const NAMESPACE = 'Order'

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
  try {
    // const orderFind = await services.updateByID(orderRequest)
    return res.formatter.dynamicFind({})
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
