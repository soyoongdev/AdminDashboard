import { Op } from 'sequelize'
import logEvent from '~/v1/helpers/log-event'
import { ResponseStory } from '~/v1/middleware/express-formatter'
import CartSchema, { Cart } from '~/v1/models/cart.model'
import logging from '~/v1/utils/logging'
import InventorySchema from '../models/inventory.model'

const NAMESPACE = 'service/cart'

export async function createNew(cart: Cart): Promise<ResponseStory> {
  try {
    const cartToCreateNew = await CartSchema.findOne({
      where: {
        userID: cart.userID
      }
    })
    if (cartToCreateNew) {
      return {
        status: 400,
        message: 'Cart already exists',
        data: cartToCreateNew
      }
    } else {
      // Before adding, we need to check whether the quantity is sufficient or not.
      const carts = await CartSchema.findAll()
      const productsInput = cart.products
      for (let i = 0; i < productsInput.length; i++) {
        const inventoryOfProduct = await InventorySchema.findOne({
          where: {
            productID: productsInput[i].productID,
            quantity: {
              [Op.gte]: productsInput[i].quantity
            }
          }
        })
        const newCartSaved = await CartSchema.create({ ...cart, orderNumber: carts ? carts.length : 0 })

        if (newCartSaved && inventoryOfProduct) {
          return {
            status: 200,
            message: `Success!`,
            data: {
              newCartSaved
            }
          }
        } else {
          return {
            status: 400,
            message: `Failed!`
          }
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

// Update
export const updateByUserID = async (cart: Cart): Promise<ResponseStory> => {
  try {
    const cartToUpdate = await CartSchema.findOne({
      where: {
        userID: cart.userID
      }
    })
    if (cartToUpdate) {
      const dbProducts = cartToUpdate.dataValues.products
      const inputProducts = cart.products
      for (let i = 0; i < dbProducts.length; i++) {
        for (let j = 0; j < inputProducts.length; j++) {
          if (dbProducts[i].productID === inputProducts[j].productID) {
            // Update
            // Before updating, we need to check whether the quantity is sufficient or not.
            dbProducts[i].quantity += inputProducts[j].quantity
            const inventoryOfProduct = await InventorySchema.findOne({
              where: {
                productID: dbProducts[i].productID,
                quantity: {
                  [Op.gte]: inputProducts[j].quantity
                }
              }
            })
            if (inventoryOfProduct) {
              const inventoryUpdated = await InventorySchema.decrement(
                { quantity: inputProducts[j].quantity },
                { where: { productID: dbProducts[i].productID } }
              )
              const cartUpdated = await CartSchema.update({ products: dbProducts }, { where: { userID: cart.userID } })
              if (inventoryUpdated && cartUpdated) {
                return {
                  status: 200,
                  message: 'Success!'
                }
              } else {
                return {
                  status: 400,
                  message: 'Failed!',
                  data: {
                    cart: cartUpdated,
                    inventory: inventoryUpdated
                  }
                }
              }
            } else {
              const inventoryToCheck = await InventorySchema.findOne({
                where: {
                  productID: dbProducts[i].productID
                }
              })
              return {
                status: inventoryToCheck ? 400 : 404,
                message: inventoryToCheck
                  ? inventoryToCheck.dataValues.quantity > 0
                    ? `Số lượng trong kho hiện không đủ, vui lòng đặt số lượng <= ${inventoryToCheck?.dataValues.quantity}`
                    : `Số lượng trong kho hiện đã hết`
                  : 'không tìm thấy kho sản phẩm!'
              }
            }
          }
        }
      }
      return {
        status: 404,
        message: 'Không tìm thấy sản phẩm trong giỏ hàng!',
        data: cartToUpdate
      }
    } else {
      return {
        status: 404,
        message: `Không tìm thấy cartID: ${cart.cartID}!`,
        data: cart
      }
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
