import logEvent from '~/v1/helpers/log-event'
import { ResponseStory } from '~/v1/middleware/express-formatter'
import CartSchema, { Cart } from '~/v1/models/cart.model'
import logging from '~/v1/utils/logging'
import InventorySchema from '../models/inventory.model'

const NAMESPACE = 'service/cart'

export async function createNew(cart: Cart): Promise<ResponseStory> {
  try {
    const cartToUpdate = await CartSchema.findOne({
      where: {
        userID: cart.userID
      }
    })
    if (cartToUpdate) {
      for (let i = 0; i < cartToUpdate.dataValues.products.length; i++) {
        const productToUpdate = cart.products[i]
        const prevProducts = cartToUpdate.dataValues.products
        prevProducts[i].quantity += cart.products[i].quantity
        const cartToUpdateSaved = await CartSchema.update(
          { products: prevProducts },
          { where: { userID: cart.userID } }
        )
        const inventoryToUpdate = await InventorySchema.findOne({ where: { productID: productToUpdate.productID } })
        if (inventoryToUpdate) {
          if (inventoryToUpdate.dataValues.quantity < 0) {
            return {
              status: 400,
              message: 'No enough!',
              data: {
                inventory: inventoryToUpdate
              }
            }
          } else {
            if (cartToUpdateSaved) {
              const inventoryUpdated = await InventorySchema.decrement(
                { quantity: productToUpdate.quantity },
                { where: { productID: productToUpdate.productID } }
              )
              if (inventoryUpdated) {
                return {
                  status: 200,
                  message: 'Updated cart!',
                  data: await CartSchema.findOne({ where: { userID: cart.userID } }),
                  meta: await InventorySchema.findOne({
                    where: { productID: productToUpdate.productID }
                  })
                }
              } else {
                return {
                  status: 404,
                  message: 'Inventory update failed!'
                }
              }
            } else {
              return {
                status: 400,
                message: 'Cart update failed!'
              }
            }
          }
        } else {
          return {
            status: 404,
            message: 'Can not find inventory to update!'
          }
        }
      }
    } else {
      const carts = await CartSchema.findAll()
      const newCart = await CartSchema.create({ ...cart, orderNumber: carts ? carts.length : 0 })
      if (newCart) {
        for (let i = 0; i < newCart.dataValues.products.length; i++) {
          const productToUpdate = newCart.dataValues.products[i]
          const inventoryToUpdate = await InventorySchema.decrement(
            { quantity: productToUpdate.quantity },
            { where: { productID: productToUpdate.productID } }
          )
          if (inventoryToUpdate) {
            return {
              status: 200,
              message: `Cart created!`,
              data: await CartSchema.findOne({ where: { userID: cart.userID } }),
              meta: await InventorySchema.findOne({ where: { productID: productToUpdate.productID } })
            }
          } else {
            return {
              status: 400,
              message: `Inventory update failed!`,
              data: inventoryToUpdate
            }
          }
        }
      } else {
        return {
          status: 400,
          message: `Cart create failed!`,
          data: newCart
        }
      }
    }
    return new Error('Unknow error')
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
      status: 200,
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
