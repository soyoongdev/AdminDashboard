import { Request, Response } from 'express'
import { User } from '~/api/v1/models/user.model'
import { createNewUser, deleteUserByID, getAllUsers, getUserByID, updateUserByID } from '~/api/v1/services/user.service'

// Create new
export const createNew = async (req: Request, res: Response) => {
  const { username, fullname, email, password, avatar, phone, address, birthday, roleID, orderNumber } = req.body

  const userRequest: User = {
    username,
    fullname,
    email,
    password,
    avatar,
    phone,
    address,
    birthday,
    roleID,
    orderNumber
  }
  try {
    const newUser = await createNewUser(userRequest)
    return res.formatter.created(newUser, null, 'User created')
  } catch (error) {
    return res.formatter.badRequest(error)
  }
}
// Get by id
export const getByID = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await getUserByID(parseInt(id))
    return res.formatter.ok(user, null)
  } catch (error) {
    return res.formatter.badRequest('error')
  }
}

// Get all
export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers()
    return res.formatter.ok(users, { total: users.length })
  } catch (error) {
    return res.formatter.badRequest(error)
  }
}

// Update
export const updateByID = async (req: Request, res: Response) => {
  const { id } = req.params
  const { username, fullname, email, password, avatar, phone, address, birthday, roleID, orderNumber } = req.body
  const userRequest: User = {
    userID: parseInt(id),
    username,
    fullname,
    email,
    password,
    avatar,
    phone,
    address,
    birthday,
    roleID,
    orderNumber
  }
  try {
    const user = await updateUserByID(userRequest)
    if (!user) {
      return res.formatter.notFound(null, null, 'User not found')
    } else {
      return res.formatter.ok(user, null, 'User founded!')
    }
  } catch (error) {
    return res.formatter.badRequest(error)
  }
}

// Delete
export const deleteByID = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await deleteUserByID(parseInt(id))
    if (!user) {
      return res.formatter.notFound(null, null, 'User not found')
    } else {
      return res.formatter.ok(user)
    }
  } catch (error) {
    return res.formatter.badRequest(error)
  }
}
