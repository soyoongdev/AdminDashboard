import logEvent from '~/helpers/log-event'
import { ResponseStory } from '~/middleware/express-formatter'
import InventorySchema, { Inventory } from '~/models/inventory.model'
import logging from '~/utils/logging'

const NAMESPACE = 'Inventory'

export const createNew = async (inventory: Inventory): Promise<ResponseStory> => {
  try {
    const length = (await InventorySchema.findAll()).length
    const inventoryNew = await InventorySchema.create({ ...inventory, orderNumber: length })
    return {
      status: inventoryNew ? 200 : 400,
      message: inventoryNew ? `${NAMESPACE} created successfully!` : `${NAMESPACE} create failed!`,
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
      message: inventory ? `${NAMESPACE} founded!` : `${NAMESPACE} not found!`,
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
    const inventorys = await InventorySchema.findAll()
    return {
      status: inventorys ? 200 : 400,
      message: inventorys ? `${NAMESPACE} founded!` : `${NAMESPACE} not found!`,
      data: inventorys
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
  }
}

// Update
export const updateByID = async (inventory: Inventory): Promise<ResponseStory> => {
  try {
    const inventoryFind = await InventorySchema.findByPk(inventory.inventoryID)
    if (!inventoryFind) {
      return {
        status: 400,
        message: `${NAMESPACE} not found!`
      }
    } else {
      inventoryFind.set(inventory)
      const inventorySaved = await inventoryFind.save()
      return {
        status: inventorySaved ? 200 : 400,
        message: inventorySaved ? `${NAMESPACE} saved successfully!` : `${NAMESPACE} save failed!`,
        data: inventorySaved
      }
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
  }
}

// Delete
export const deleteByID = async (id: number): Promise<ResponseStory> => {
  try {
    const inventoryFind = await InventorySchema.findByPk(id)
    if (!inventoryFind) {
      return {
        status: 404,
        message: `${NAMESPACE} not found!`
      }
    } else {
      return {
        status: 200,
        message: `${NAMESPACE} has been deleted!`,
        data: await inventoryFind.destroy()
      }
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
  }
}
