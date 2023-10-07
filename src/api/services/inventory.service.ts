import logEvent from '~/helpers/log-event'
import { ResponseStory } from '~/middleware/express-formatter'
import InventorySchema, { Inventory, InventoryInstance } from '~/models/inventory.model'
import logging from '~/utils/logging'

const NAMESPACE = 'Inventory'

export const createNew = async (inventory: Inventory): Promise<ResponseStory> => {
  try {
    const inventories = await InventorySchema.findAll()
    const inventoryNew = await InventorySchema.create({ ...inventory, orderNumber: inventories.length })
    return {
      status: inventoryNew ? 200 : 400,
      data: inventoryNew
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
  }
}

// Get by id
export const getByID = async (id: number): Promise<ResponseStory> => {
  try {
    const inventory = await InventorySchema.findByPk(id)
    return {
      status: inventory ? 200 : 404,
      data: inventory
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
  }
}

// Get by id
export const getByProductID = async (productID: number): Promise<ResponseStory> => {
  try {
    const inventory = await InventorySchema.findOne({ where: { productID: productID } })
    return {
      status: inventory ? 200 : 404,
      data: inventory
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
  }
}

// Get all
export const getAll = async (): Promise<ResponseStory> => {
  try {
    const inventories = await InventorySchema.findAll()
    return {
      status: inventories ? 200 : 400,
      data: inventories
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
  }
}

// Update
export const updateByProductID = async (inventory: Inventory): Promise<ResponseStory> => {
  try {
    const inventoryUpdated = await InventorySchema.update(inventory, { where: { productID: inventory.productID } })
    return {
      status: inventoryUpdated ? 200 : 400,
      data: inventoryUpdated
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
  }
}

export const updateReservationItemByProductID = async (
  productID: number,
  item: { userID: number; quantity: number }
): Promise<InventoryInstance | undefined> => {
  try {
    const inventoryToUpdate = await InventorySchema.findOne({
      where: {
        productID: productID
      }
    })
    let _model: any = {}
    const reservations = inventoryToUpdate?.getDataValue('reservations') || []
    if (inventoryToUpdate) {
      for (let i = 0; i < reservations.length; i++) {
        if (reservations[i].userID === item.userID) {
          inventoryToUpdate.getDataValue('reservations')[i].quantity += item.quantity
          inventoryToUpdate.changed('reservations', true) // Force change to update
          _model = await inventoryToUpdate.save()
        }
      }
    } else {
      _model = undefined
      console.log('object')
    }
    return _model
  } catch (error) {
    throw Error(`${error}`)
  }
}

// Delete
export const deleteByID = async (id: number): Promise<ResponseStory> => {
  try {
    const inventoryFind = await InventorySchema.findByPk(id)
    if (!inventoryFind) {
      return {
        status: 404
      }
    } else {
      return {
        status: 200,
        data: await inventoryFind.destroy()
      }
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
  }
}
