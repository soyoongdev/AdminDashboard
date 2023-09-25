import logEvent from '~/helpers/log-event'
import { ResponseStory } from '~/middleware/express-formatter'
import OrderSchema, { Order } from '~/models/order.model'
import logging from '~/utils/logging'

const NAMESPACE = 'Order'

export const createNew = async (order: Order): Promise<ResponseStory> => {
  try {
    const length = (await OrderSchema.findAll()).length
    const cartNew = await OrderSchema.create({ ...order, orderNumber: length })
    return {
      status: cartNew ? 200 : 400,
      message: cartNew ? `${NAMESPACE} created successfully!` : `${NAMESPACE} create failed!`,
      data: cartNew
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
    const order = await OrderSchema.findByPk(id)
    return {
      status: order ? 200 : 404,
      message: order ? `${NAMESPACE} founded!` : `${NAMESPACE} not found!`,
      data: order
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
    const carts = await OrderSchema.findAll()
    return {
      status: carts ? 200 : 400,
      message: carts ? `${NAMESPACE} founded!` : `${NAMESPACE} not found!`,
      data: carts
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
  }
}

// Update
export const updateByID = async (order: Order): Promise<ResponseStory> => {
  try {
    const cartFind = await OrderSchema.findByPk(order.cartID)
    if (!cartFind) {
      return {
        status: 400,
        message: `${NAMESPACE} not found!`
      }
    } else {
      cartFind.set(order)
      const cartSaved = await cartFind.save()
      return {
        status: cartSaved ? 200 : 400,
        message: cartSaved ? `${NAMESPACE} saved successfully!` : `${NAMESPACE} save failed!`,
        data: cartSaved
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
    const cartFind = await OrderSchema.findByPk(id)
    if (!cartFind) {
      return {
        status: 404,
        message: `${NAMESPACE} not found!`
      }
    } else {
      return {
        status: 200,
        message: `${NAMESPACE} has been deleted!`,
        data: await cartFind.destroy()
      }
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
  }
}
