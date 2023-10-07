import logEvent from '~/helpers/log-event'
import { ResponseStory } from '~/middleware/express-formatter'
import CartSchema, { Cart, CartInstance } from '~/models/cart.model'
import logging from '~/utils/logging'

const NAMESPACE = 'service/cart'

export const addToCart = async (cartInput: Cart): Promise<CartInstance> => {
  try {
    return await CartSchema.create(cartInput)
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${NAMESPACE} :: ${error}`)
    throw new Error(`${NAMESPACE} :: ${error}`)
  }
}

// Update
export const updateCartByUserID = async (cartInput: Cart): Promise<ResponseStory> => {
  try {
    return { status: 200 }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${NAMESPACE} :: ${error}`)
    throw new Error(`${NAMESPACE} :: ${error}`)
  }
}

// Get by id
export const getByUserID = async (userID: number): Promise<CartInstance | null> => {
  try {
    const cart = await CartSchema.findOne({ where: { userID: userID } })
    return cart
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${NAMESPACE} :: ${error}`)
    throw new Error(`${NAMESPACE} :: ${error}`)
  }
}

// Get all
export const getAll = async (): Promise<ResponseStory> => {
  try {
    const carts = await CartSchema.findAll()
    return {
      status: carts ? 200 : 400,
      data: carts
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${NAMESPACE} :: ${error}`)
    throw new Error(`${NAMESPACE} :: ${error}`)
  }
}

// Delete
export const deleteByUserID = async (userID: number): Promise<ResponseStory> => {
  try {
    const cartFind = await CartSchema.findOne({ where: { userID: userID } })
    if (!cartFind) {
      return {
        status: 404,
        message: `UserID: ${userID} not found!`
      }
    } else {
      return {
        status: 200,
        message: `UserID: ${userID} has been deleted!`,
        data: await cartFind.destroy()
      }
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${NAMESPACE} :: ${error}`)
    throw new Error(`${NAMESPACE} :: ${error}`)
  }
}
