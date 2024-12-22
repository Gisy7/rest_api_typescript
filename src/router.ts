import { Router } from "express"
import { createProduct, deleteProduct, editAvailabilityProduct, editProduct, getProductById, getProducts } from "./handlers/product"
import express from 'express';
import { body, check, param, validationResult } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                      id:
 *                          type: integer
 *                          description: The product ID
 *                          example: 1
 *                      name:
 *                          type: string
 *                          description: The product name
 *                          example: TV 55" OLED
 * 
 *                      price:
 *                          type: number
 *                          description: The product price
 *                          example: 3000
 * 
 *                      availability:
 *                          type: boolean
 *                          description: The product availability
 *                          example: true
 */


// Routing


/**
 * @swagger
 * paths: 
 *  /api/:
 *      get:
 *          summary: Returns a list of products.
 *          tags: 
 *              - Product
 *          responses: 
 *              "200":
 *                  description: A JSON array of products.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#components/schemas/Product'                             
 */

router.get("/", getProducts)



router.get("/prueba", (req, res, next) => {
    res.json({ msg: "Prueba de API" })
})


/** 
 * @swagger
 * paths:
 *      /api/{id}:
 *          get:
 *              summary: return a product by ID.
 *              tags: 
 *                  - Product
 *              parameters:
 *                  - in: path
 *                    name: id
 *                    description: The ID of the product to retrieve
 *                    required: true
 *                    schema: 
 *                      type: integer 
 *              responses:
 *                  "200":
 *                      description: A JSON object of product by ID
 *                      content: 
 *                          application/json:
 *                              schema:
 *                                  items:
 *                                      $ref: '#components/schemas/Product'   
 *                  "404":
 *                      description: Not found
 *                  "400":
 *                      description: Bad request
 *                 
 */
router.get("/:id",
    param("id").isInt().withMessage("ID no valido"),
    handleInputErrors,
    getProductById
)



/**
 * @swagger
 * paths: 
 *  /api/:
 *      post:
 *          summary: Creates new product.
 *          tags:
 *              - Product
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties: 
 *                              name:        
 *                                  type: string
 *                                  example: "TV OLED 55'"
 *                              price:
 *                                  type: number
 *                                  example: 399
 *          responses:
 *              "201":
 *                  description: Insert new product to database.
 *              "404":
 *                  description: Not found
 *              "400":
 *                  description: Bad request
 *          
 *              
 * 
 *      
 *  
 */
router.post("/",
    body("name").notEmpty().withMessage("El nombre no puede estar vacio"),
    body("price")
        .notEmpty().withMessage("El precio no puede estar vacio")
        .isNumeric().withMessage("el precio tiene que ser un numero")
        .custom(value => value > 0).withMessage("el precio tiene que ser mayor a 0"),
    handleInputErrors,
    createProduct
)


/** 
 * @swagger
 * paths:
 *  /api/{id}:
 *      put:
 *          summary: Edit product by ID.
 *          tags:
 *              - Product
 *          parameters:
 *              - in: path
 *                name: id
 *                description: The ID of the product to retrieve
 *                required: true
 *                schema: 
 *                  type: integer 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties: 
 *                              name:        
 *                                  type: string
 *                                  example: "TV OLED 55'"
 *                              price:
 *                                  type: number
 *                                  example: 399
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              "200":
 *                  description: Edit product Sucessfull.
 *              "404":
 *                  description: Not found
 *              "400":
 *                  description: Bad request   
 */
router.put("/:id",
    param("id").isInt().withMessage("ID no valido"),
    body("name").notEmpty().withMessage("El nombre no puede estar vacio"),
    body("price")
        .notEmpty().withMessage("El precio no puede estar vacio")
        .isNumeric().withMessage("el precio tiene que ser un numero")
        .custom(value => value > 0).withMessage("el precio tiene que ser mayor a 0"),
    handleInputErrors,
    editProduct
)



/** 
 * @swagger
 * paths:
 *  /api/{id}:
 *      patch:
 *          summary: Toggle availability boolean.
 *          tags:
 *              - Product
 *          parameters:
 *              - in: path
 *                name: id
 *                description: The ID of the product to retrieve
 *                required: true
 *                schema: 
 *                  type: integer 
 *          responses:
 *              "200":
 *                  description: Edit availability Sucessfull.
 *              "404":
 *                  description: Not found
 *              "400":
 *                  description: Bad request   
 */
router.patch("/:id",
    param("id").isInt().withMessage("ID no valido"),
    handleInputErrors,
    editAvailabilityProduct
)






/**
 * @swagger
 * paths:
 *  /api/{id}:
 *      delete:
 *          summary: Delete product
 *          tags:
 *              - Product
 *          parameters:
 *              - in: path
 *                name: id
 *                description: The ID of the product to retrieve
 *                required: true
 *                schema: 
 *                  type: integer 
 *          responses:
 *              "200":
 *                  description: Delete product Sucessful.
 *              "404":
 *                  description: Not found
 *              "400":
 *                  description: Bad request   
 *          
 */
router.delete("/:id",
    param("id").isInt().withMessage("ID no valido"),
    handleInputErrors,
    deleteProduct
)





export default router