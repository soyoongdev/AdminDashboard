import logEvent from '~/v1/helpers/log-event'
import UserSchema, { User } from '~/v1/models/user.model'
import logging from '~/v1/utils/logging'
import { ResponseStory } from '../middleware/express-formatter'

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
    const user = await UserSchema.findByPk(id)
    return user
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
  }
}

// Get by id
export const getUserByEmail = async (email: string): Promise<ResponseStory> => {
  try {
    const user = await UserSchema.findOne({ where: { email: email } })
    return {
      status: user ? 200 : 404,
      message: user ? 'User founded successfully' : 'User not found',
      data: user ?? user
    }
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

// Update
export const updateUserByEmail = async (user: User): Promise<ResponseStory> => {
  try {
    const userFind = await UserSchema.findOne({ where: { email: user.email } })
    if (!userFind) {
      return {
        status: 404,
        message: `Can not find user with email: ${user.email}`
      }
    } else {
      userFind.set(user)
      return {
        status: 200,
        message: 'User updated successfully',
        data: await userFind.save()
      }
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
  }
}

// Partial update
export const partialUpdateUserByID = async (user: User) => {
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
