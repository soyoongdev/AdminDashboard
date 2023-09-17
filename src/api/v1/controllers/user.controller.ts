import { Request, Response } from 'express'
import { User } from '~/v1/models/user.model'
import {
  createNewUser,
  deleteUserByID,
  getAllUsers,
  getUserByID,
  partialUpdateUserByID,
  updateUserByID
} from '~/v1/services/user.service'

// Create new
export const createNew = async (req: Request, res: Response) => {
  const userRequest: User = {
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.avatar,
    phone: req.body.phone,
    address: req.body.address,
    birthday: req.body.birthday,
    roleID: req.body.roleID,
    orderNumber: req.body.orderNumber
  }
  try {
    const newUser = await createNewUser(userRequest)
    return res.formatter.created({ data: newUser, message: 'User created' })
  } catch (error) {
    return res.formatter.badRequest({ message: `${error}` })
  }
}
// Get by id
export const getByID = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await getUserByID(parseInt(id))
    return res.formatter.ok({ data: user, message: user ? 'User founded' : 'User not found' })
  } catch (error) {
    return res.formatter.badRequest({ message: `${error}` })
  }
}

// Get all
export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers()
    return res.formatter.ok({ data: users, meta: { total: users.length } })
  } catch (error) {
    return res.formatter.badRequest({ message: `${error}` })
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
      return res.formatter.notFound({ message: 'User not found' })
    } else {
      return res.formatter.ok({ data: user })
    }
  } catch (error) {
    return res.formatter.badRequest({ message: `${error}` })
  }
}

// Partial Update
export const partialUpdateByID = async (req: Request, res: Response) => {
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
    const user = await partialUpdateUserByID(userRequest)
    if (!user) {
      return res.formatter.notFound({ message: 'User not found' })
    } else {
      return res.formatter.ok({ data: user })
    }
  } catch (error) {
    return res.formatter.badRequest({ message: `${error}` })
  }
}

// Delete
export const deleteByID = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await deleteUserByID(parseInt(id))
    if (!user) {
      return res.formatter.notFound({ message: 'User not found' })
    } else {
      return res.formatter.ok(user)
    }
  } catch (error) {
    return res.formatter.badRequest({ message: `${error}` })
  }
}
