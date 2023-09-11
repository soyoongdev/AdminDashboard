import { Request, Response } from 'express'
import UserSchema from '~/models/user.model'
import * as logging from '~/utils/logging'

const NAMESPACE = '[controller/user]'

// Get by id
export const getByID = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await UserSchema.findByPk(id)
    return res.formatter.ok(user)
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    return res.formatter.badRequest(error)
  }
}

// Get all
export const getAll = async (req: Request, res: Response) => {
  try {
    const user = await UserSchema.findAll()
    res.formatter.ok(user, { total: user.length })
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    res.formatter.badRequest(error)
  }
}

// Create new
export const createNew = async (req: Request, res: Response) => {
  const { username, fullname, email, password, avatar, phone, birthday, roleID } = req.body

  try {
    const newUser = await UserSchema.create({
      roleID: roleID,
      username: username,
      fullname: fullname,
      email: email,
      password: password,
      avatar: avatar,
      phone: phone,
      birthday: birthday
    })
    res.formatter.created(newUser)
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    res.formatter.badRequest(error)
  }
}

// Update
export const updateByID = async (req: Request, res: Response) => {
  const { id } = req.params
  const { username, fullname, email, password, avatar, phone, birthday, roleID } = req.body
  try {
    const user = await UserSchema.findByPk(id)
    if (user === null) {
      return res.formatter.notFound('User not found')
    } else {
      user.set({
        roleID: roleID,
        username: username,
        fullname: fullname,
        email: email,
        password: password,
        avatar: avatar,
        phone: phone,
        birthday: birthday
      })

      await user.save()

      return res.formatter.ok(user)
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    return res.formatter.badRequest(error)
  }
}

// Delete
export const deleteByID = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await UserSchema.findByPk(id)
    if (user === null) {
      return res.formatter.notFound('User not found')
    } else {
      await user.destroy()
      return res.formatter.ok(user)
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    return res.formatter.badRequest(error)
  }
}
