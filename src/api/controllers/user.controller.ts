import { Request, Response } from 'express'
import { User } from '~/models/user.model'
import * as service from '~/services/user.service'

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
    const newUser = await service.createNew(userRequest)
    return res.formatter.dynamicFind({ ...newUser })
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}
// Get by id
export const getByID = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await service.getByID(parseInt(id))
    return res.formatter.dynamicFind({ ...user })
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Get all
export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await service.getAll()
    return res.formatter.dynamicFind({ ...users, message: users.data.length })
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Update
export const updateByID = async (req: Request, res: Response) => {
  const { id } = req.params
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
    const user = await service.updateByID(userRequest)
    return res.formatter.dynamicFind(user)
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Delete
export const deleteByID = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await service.deleteByID(parseInt(id))
    return res.formatter.dynamicFind(user)
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}
