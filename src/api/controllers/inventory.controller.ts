import { Request, Response } from 'express'
import { Inventory } from '~/models/inventory.model'
import * as services from '~/services/inventory.service'

const NAMESPACE = 'Inventory'

export const createNew = async (req: Request, res: Response) => {
  try {
    const inventoryRequest: Inventory = {
      brandID: req.body.brandID,
      productID: req.body.productID,
      quantity: req.body.quantity,
      reservations: req.body.reservations
    }
    const inventoryNew = await services.createNew(inventoryRequest)
    return res.formatter.dynamicFind(inventoryNew)
  } catch (error) {
    res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Get by id
export const getByID = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const inventory = await services.getByID(parseInt(id))
    return res.formatter.dynamicFind(inventory)
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
  const inventoryRequest: Inventory = {
    inventoryID: parseInt(req.params.id),
    brandID: req.body.brandID,
    productID: req.body.productID,
    quantity: req.body.quantity,
    reservations: req.body.reservations
  }
  try {
    const inventoryFind = await services.updateByID(inventoryRequest)
    return res.formatter.dynamicFind(inventoryFind)
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Delete
export const deleteByID = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const inventoryFind = await services.deleteByID(parseInt(id))
    return res.formatter.dynamicFind(inventoryFind)
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}
