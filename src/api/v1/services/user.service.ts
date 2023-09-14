import logEvent from '../helpers/log-event'
import UserSchema, { User } from '../models/user.model'
import logging from '../utils/logging'

const NAMESPACE = '[services/user]'

export const createNewUser = async (user: User) => {
  try {
    const length = (await UserSchema.findAll()).length
    return await UserSchema.create({ ...user, orderNumber: length })
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
  }
}

// Get by id
export const getUserByID = async (id: number) => {
  try {
    return await UserSchema.findByPk(id)
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
  }
}

// Get all
export const getAllUsers = async () => {
  try {
    return await UserSchema.findAll()
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
  }
}

// Update
export const updateUserByID = async (user: User) => {
  try {
    const userFind = await UserSchema.findByPk(user.userID)
    if (!userFind) {
      return null
    } else {
      userFind.set(user)
      return await userFind.save()
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
  }
}

// Delete
export const deleteUserByID = async (id: number) => {
  try {
    const userFind = await UserSchema.findByPk(id)
    if (!userFind) {
      return null
    } else {
      return await userFind.destroy()
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
  }
}
