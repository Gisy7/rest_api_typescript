"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.editAvailabilityProduct = exports.editProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const Product_model_1 = __importDefault(require("../models/Product.model"));
const getProducts = async (req, res) => {
    const products = await Product_model_1.default.findAll({
        order: [
            ["id", "DESC"]
        ],
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    });
    res.json({ data: products });
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    const product = await Product_model_1.default.findByPk(req.params.id);
    if (!product) {
        res.status(404).send({ errors: "Producto no encontrado" });
        return;
    }
    res.json({ data: product });
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    const product = await Product_model_1.default.create(req.body);
    res.status(201).json(product);
};
exports.createProduct = createProduct;
const editProduct = async (req, res) => {
    console.log("desde Patch");
    const product = await Product_model_1.default.findByPk(req.params.id);
    if (!product) {
        res.status(404).send({ errors: "Producto no encontrado" });
        return;
    }
    product.availability = req.body.availability;
    product.name = req.body.name;
    product.price = req.body.price;
    await product.save();
    res.json({ data: product });
};
exports.editProduct = editProduct;
const editAvailabilityProduct = async (req, res) => {
    console.log("desde patch");
    const product = await Product_model_1.default.findByPk(req.params.id);
    if (!product) {
        res.status(404).send({ errors: "Producto no encontrado" });
        return;
    }
    product.availability = !product.availability;
    await product.save();
    res.json({ data: product });
};
exports.editAvailabilityProduct = editAvailabilityProduct;
const deleteProduct = async (req, res) => {
    const product = await Product_model_1.default.findByPk(req.params.id);
    if (!product) {
        res.status(404).send({ errors: "Producto no encontrado" });
        return;
    }
    await product.destroy();
    res.json({ data: "Producto eliminado" });
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.js.map