import logEvent from '~/v1/helpers/log-event'
import { ResponseStory } from '~/v1/middleware/express-formatter'
import CartSchema, { Cart } from '~/v1/models/cart.model'
import logging from '~/v1/utils/logging'

const NAMESPACE = 'Cart'

export const createNew = async (cart: Cart): Promise<ResponseStory> => {
  try {
    const length = (await CartSchema.findAll()).length
    const cartNew = await CartSchema.create({ ...cart, orderNumber: length })
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
    const cart = await CartSchema.findByPk(id)
    return {
      status: cart ? 200 : 404,
      message: cart ? `${NAMESPACE} founded!` : `${NAMESPACE} not found!`,
      data: cart
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
    const carts = await CartSchema.findAll()
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
export const updateByID = async (cart: Cart): Promise<ResponseStory> => {
  try {
    const cartFind = await CartSchema.findByPk(cart.cartID)
    if (!cartFind) {
      return {
        status: 400,
        message: `${NAMESPACE} not found!`
      }
    } else {
      cartFind.set(cart)
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
    const cartFind = await CartSchema.findByPk(id)
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
