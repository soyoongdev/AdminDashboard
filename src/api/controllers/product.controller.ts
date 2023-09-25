import { Request, Response } from 'express'
import generator from 'otp-generator'
import { Product } from '~/v1/models/product.model'
import * as services from '~/v1/services/product.service'

const NAMESPACE = 'Product'

export const createNew = async (req: Request, res: Response) => {
  try {
    const productRequest: Product = {
      categoryID: req.body.categoryID,
      code: generator
        .generate(6, { digits: false, lowerCaseAlphabets: false, upperCaseAlphabets: true, specialChars: false })
        .toString(),
      images: req.body.images,
      name: req.body.name,
      desc: req.body.desc,
      releaseDate: new Date().toISOString()
    }
    const productNew = await services.createNew(productRequest)
    console.log(productNew)
    return res.formatter.dynamicFind(productNew)
  } catch (error) {
    res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Get by id
export const getByID = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const product = await services.getByID(parseInt(id))
    return res.formatter.dynamicFind(product)
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Get all
export const getAll = async (req: Request, res: Response) => {
  try {
    const products = await services.getAll()
    return res.formatter.dynamicFind(products)
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Update
export const updateByID = async (req: Request, res: Response) => {
  const { id } = req.params
  const productRequest: Product = {
    productID: parseInt(id),
    categoryID: req.body.categoryID,
    rateID: req.body.rateID,
    itemID: req.body.itemID,
    code: req.body.code,
    images: req.body.images
  }
  try {
    const productFind = await services.updateByID(productRequest)
    return res.formatter.dynamicFind(productFind)
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}

// Delete
export const deleteByID = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const productFind = await services.deleteByID(parseInt(id))
    return res.formatter.dynamicFind(productFind)
  } catch (error) {
    return res.formatter.dynamicFind({ message: `${error}` })
  }
}
