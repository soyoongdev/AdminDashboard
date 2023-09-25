import logEvent from '~/helpers/log-event'
import { ResponseStory } from '~/middleware/express-formatter'
import ProductSchema, { Product } from '~/models/product.model'
import logging from '~/utils/logging'

const NAMESPACE = 'Product'

export const createNew = async (product: Product): Promise<ResponseStory> => {
  try {
    const length = (await ProductSchema.findAll()).length
    const productNew = await ProductSchema.create({ ...product, orderNumber: length })
    return {
      status: productNew ? 200 : 400,
      message: productNew ? `${NAMESPACE} created successfully!` : `${NAMESPACE} create failed!`,
      data: productNew
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
    const product = await ProductSchema.findByPk(id)
    return {
      status: product ? 200 : 404,
      message: product ? `${NAMESPACE} founded!` : `${NAMESPACE} not found!`,
      data: product
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
    const products = await ProductSchema.findAll()
    return {
      status: products ? 200 : 400,
      message: products ? `${NAMESPACE} founded!` : `${NAMESPACE} not found!`,
      data: products,
      meta: {
        total: products.length
      }
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
  }
}

// Update
export const updateByID = async (product: Product): Promise<ResponseStory> => {
  try {
    const productFind = await ProductSchema.findByPk(product.productID)
    if (!productFind) {
      return {
        status: 400,
        message: `${NAMESPACE} not found!`
      }
    } else {
      productFind.set(product)
      const productSaved = await productFind.save()
      return {
        status: productSaved ? 200 : 400,
        message: productSaved ? `${NAMESPACE} saved successfully!` : `${NAMESPACE} save failed!`,
        data: productSaved
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
    const productFind = await ProductSchema.findByPk(id)
    if (!productFind) {
      return {
        status: 404,
        message: `${NAMESPACE} not found!`
      }
    } else {
      return {
        status: 200,
        message: `${NAMESPACE} has been deleted!`,
        data: await productFind.destroy()
      }
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
  }
}
