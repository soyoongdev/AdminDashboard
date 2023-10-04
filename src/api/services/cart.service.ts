import logEvent from '~/helpers/log-event'
import { ResponseStory } from '~/middleware/express-formatter'
import CartSchema, { Cart } from '~/models/cart.model'
import InventorySchema from '~/models/inventory.model'
import * as inventoryService from '~/services/inventory.service'
import logging from '~/utils/logging'

const NAMESPACE = 'service/cart'

export const addToCart = async (cart: Cart): Promise<ResponseStory> => {
  try {
    const productsInput = cart.products
    for (let i = 0; i < productsInput.length; i++) {
      const inventoryToUpdate = await InventorySchema.findOne({
        where: {
          productID: cart.products[i].productID
        }
      })
      if (inventoryToUpdate) {
        if (inventoryToUpdate.getDataValue('quantity') >= cart.products[i].quantity) {
          const reservations = inventoryToUpdate.getDataValue('reservations')
          for (let k = 0; k < reservations.length; k++) {
            if (reservations[k].userID === cart.userID) {
              inventoryToUpdate.getDataValue('reservations')[k].quantity += cart.products[i].quantity
              inventoryToUpdate.changed('reservations', true)
              const inventoryUpdated = await inventoryToUpdate.save()

              if (inventoryUpdated) {
                // Update quantity's product cart
                const cartCreated = await CartSchema.create(cart)
                if (cartCreated) {
                  return {
                    status: 201,
                    message: 'Cart created!',
                    data: cartCreated,
                    meta: inventoryUpdated
                  }
                } else {
                  return {
                    status: 400,
                    message: 'Cart update failed!'
                  }
                }
              } else {
                return {
                  status: 400,
                  message: `Can not update reservation's inventory`
                }
              }
            }
          }
          inventoryToUpdate.changed('reservations', true)
          const inventoryCreated = await inventoryToUpdate.save()
          if (inventoryCreated) {
            const cartCreated = await CartSchema.create(cart)
            return {
              status: cartCreated ? 200 : 400,
              message: cartCreated ? 'Success!' : 'Failed!',
              data: cartCreated
            }
          } else {
            return {
              status: 400,
              message: 'Failed to create inventory'
            }
          }
        } else {
          return {
            status: 400,
            message: 'Not enough response quantity',
            data: inventoryToUpdate
          }
        }
      }
    }
    return {
      status: 404,
      message: 'Can not find inventory to update'
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${NAMESPACE} :: ${error}`)
    throw new Error(`${NAMESPACE} :: ${error}`)
  }
}

// Update
export const updateByUserID = async (cart: Cart): Promise<ResponseStory> => {
  try {
    const cartToUpdate = await CartSchema.findOne({
      where: {
        userID: cart.userID
      }
    })
    if (cartToUpdate) {
      const dbCartProducts = cartToUpdate.getDataValue('products')
      /*
      1 Update cart
      2 Update reservation's inventory
      */
      for (let i = 0; i < dbCartProducts.length; i++) {
        for (let j = 0; j < cart.products.length; j++) {
          if (dbCartProducts[i].productID === cart.products[j].productID) {
            const inventoryUpdated = await inventoryService.updateReservationItemByUserID(
              cart.products[j].productID,
              cart.userID,
              cart.products[j].quantity
            )
            if (inventoryUpdated) {
              // Update quantity's product cart
              cartToUpdate.getDataValue('products')[i].quantity += cart.products[j].quantity
              cartToUpdate.changed('products', true)
              const cartUpdated = await cartToUpdate.save()
              if (cartUpdated) {
                return {
                  status: 200,
                  message: 'Cart updated!',
                  data: cartUpdated,
                  meta: inventoryUpdated
                }
              } else {
                return {
                  status: 400,
                  message: 'Cart update failed!'
                }
              }
            } else {
              return {
                status: 400,
                message: `Can not update reservation's inventory`
              }
            }
          }
        }
      }
      return {
        status: 404,
        message: 'Can not find product in cart!'
      }
    } else {
      return {
        status: 404,
        message: `Can not find cartID: ${cart.cartID}!`
      }
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
  }
}

// Get by id
export const getByUserID = async (userID: number): Promise<ResponseStory> => {
  try {
    const cart = await CartSchema.findOne({ where: { userID: userID } })
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
      data: carts
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
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
    logEvent(`${error}`)
    throw error
  }
}
