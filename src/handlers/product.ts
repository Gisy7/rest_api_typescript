import { Request, Response } from "express"
import { check, validationResult } from "express-validator"
import Product from '../models/Product.model';

export const getProducts = async (req: Request, res: Response) => {

    const products = await Product.findAll({
        order: [
            ["id", "DESC"]
        ],
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    })

    res.json({ data: products })
}

export const getProductById = async (req: Request, res: Response) => {

    const product = await Product.findByPk(req.params.id)

    if (!product) {
        res.status(404).send({ errors: "Producto no encontrado" })
        return
    }

    res.json({ data: product })

}

export const createProduct = async (req: Request, res: Response) => {
    const product = await Product.create(req.body)
    res.status(201).json(product)

}


export const editProduct = async (req: Request, res: Response) => {
    console.log("desde Patch")

    const product = await Product.findByPk(req.params.id)


    if (!product) {
        res.status(404).send({ errors: "Producto no encontrado" })
        return
    }

    product.availability = req.body.availability
    product.name = req.body.name
    product.price = req.body.price
    await product.save()

    res.json({ data: product })
}


export const editAvailabilityProduct = async (req: Request, res: Response) => {
    console.log("desde patch")
    const product = await Product.findByPk(req.params.id)


    if (!product) {
        res.status(404).send({ errors: "Producto no encontrado" })
        return
    }
    product.availability = !product.availability

    await product.save()

    res.json({ data: product })
}


export const deleteProduct = async (req: Request, res: Response) => {
    const product = await Product.findByPk(req.params.id)


    if (!product) {
        res.status(404).send({ errors: "Producto no encontrado" })
        return
    }


    await product.destroy()

    res.json({ data: "Producto eliminado" })

}


