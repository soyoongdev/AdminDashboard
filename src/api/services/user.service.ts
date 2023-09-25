import logEvent from '~/v1/helpers/log-event'
import { ResponseStory } from '~/v1/middleware/express-formatter'
import UserSchema, { User } from '~/v1/models/user.model'
import logging from '~/v1/utils/logging'

const NAMESPACE = 'User'

export const createNew = async (user: User): Promise<ResponseStory> => {
  try {
    const length = (await UserSchema.findAll()).length
    const userNew = await UserSchema.create({ ...user, orderNumber: length })
    return {
      status: userNew ? 200 : 400,
      message: userNew ? `${NAMESPACE} created successfully!` : `${NAMESPACE} create failed!`,
      data: userNew
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
    const product = await UserSchema.findByPk(id)
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
    const products = await UserSchema.findAll()
    return {
      status: products ? 200 : 400,
      message: products ? `${NAMESPACE} founded!` : `${NAMESPACE} not found!`,
      data: products
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
  }
}

// Update
export const updateByID = async (user: User): Promise<ResponseStory> => {
  try {
    const userFind = await UserSchema.findByPk(user.userID)
    if (!userFind) {
      return {
        status: 400,
        message: `${NAMESPACE} not found!`
      }
    } else {
      userFind.set(user)
      const userSaved = await userFind.save()
      return {
        status: userSaved ? 200 : 400,
        message: userSaved ? `${NAMESPACE} saved successfully!` : `${NAMESPACE} save failed!`,
        data: userSaved
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
    const userFind = await UserSchema.findByPk(id)
    if (!userFind) {
      return {
        status: 404,
        message: `${NAMESPACE} not found!`
      }
    } else {
      return {
        status: 200,
        message: `${NAMESPACE} has been deleted!`,
        data: await userFind.destroy()
      }
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
  }
}
