import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *             type: object
 *             properties:
 *                id:
 *                  type: integer
 *                  description: The Product ID
 *                  example: 1
 *                name: 
 *                  type: string
 *                  description: The Product name
 *                  example: Monitor curvo de 49 pulgadas
 *                price:
 *                 type: number
 *                 description: The Product price
 *                 example: 300
 *                availability:
 *                 type: boolean
 *                 description: The Product availability
 *                 example: true
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API operations related to products
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *              application/json:
 *               schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Product'
 */

//Routing
router.get('/', getProducts)

/** 
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by ID
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to retrieve
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *          description: Successful response
 *          content:
 *             application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *      400:
 *          description: Not found
 * 
 *      404:
 *          description: Bad request - Invalid ID
 */

router.get('/:id', 
    param('id')
        .isInt().withMessage('El ID no valido'),
    handleInputErrors,
    getProductById
)

/** 
 * @swagger
 * /api/products:
 *  post:
 *      summary: Create a new product
 *      tags: [Products]
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  name:
 *                      type: string 
 *                      example: "Monitor curvo de 49 pulgadas"
 *                  price:
 *                     type: number
 *                     example: 399
 *      responses:
 *          201:
 *              description: Product created successfully
 *              content:
 *                application/json:
 *                  schema:
 *                   $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid input
 */

router.post('/',
    // Validaciones
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio'),
    body('price')
        .isNumeric().withMessage('El precio debe ser un numero')
        .notEmpty().withMessage('El precio es obligatorio')
        .custom(value => value > 0).withMessage('El precio debe ser mayor a 0'),
    handleInputErrors,
    createProduct
)

/** 
 * @swagger
 * /api/products/{id}:
 *   put:
 *    summary: Update a product by ID
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to update
 *        required: true
 *        schema:
 *          type: integer
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *                  name:
 *                      type: string 
 *                      example: "Monitor curvo de 49 pulgadas"
 *                  price:
 *                     type: number
 *                     example: 399
 *                  availability:
 *                    type: boolean
 *                    example: true
 *   responses:
 *     200:
 *       description: Product updated successfully
 *       content:
 *          application/json:
 *              schema:
 *               $ref: '#/components/schemas/Product'
 *     400:
 *       description: Bad request - Invalid input
 *     404:
 *       description: Product not found
 */

router.put('/:id', 
    // Validaciones
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio'),
    body('price')
        .isNumeric().withMessage('El precio debe ser un numero')
        .notEmpty().withMessage('El precio es obligatorio')
        .custom(value => value > 0).withMessage('El precio debe ser mayor a 0'),
    body('availability')
        .notEmpty().withMessage('La disponibilidad es obligatoria')
        .isBoolean().withMessage('La disponibilidad debe ser true o false'),
    param('id')
        .isInt().withMessage('El ID no valido'),
    handleInputErrors,
    updateProduct
)

/** 
 * @swagger
 * /api/products/{id}:
 *   patch:
 *    summary: Update product availability
 *    tags: [Products]
 *    description: Returns the updated availability
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to retrieve
 *        required: true
 *        schema:
 *          type: integer
 *   responses:
 *      200:
 *       description: Product updated successfully
 *       content:
 *          application/json:
 *              schema:
 *               $ref: '#/components/schemas/Product'
 *      400:
 *       description: Bad request - Invalid ID
 *      404:
 *       description: Product not found
 *    
 */

router.patch('/:id', 
    param('id')
        .isInt().withMessage('El ID no valido'),
    handleInputErrors,
    updateAvailability
)

/** 
 * @swagger
 * /api/products/{id}:
 *   delete:
 *    summary: Delete a product by ID
 *    tags: [Products]
 *    description: Returns a message confirming deletion
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to delete
 *        required: true
 *        schema:
 *          type: integer
 *   responses:
 *      200:
 *       description: Product deleted successfully
 *       content:
 *          application/json:
 *              schema:
 *               type: string
 *               value: 'Product deleted successfully'
 *      400:
 *       description: Bad request - Invalid ID
 *      404:
 *       description: Product not found
 *    
 */
router.delete('/:id', 
    param('id')
        .isInt().withMessage('El ID no valido'),
    handleInputErrors,
    deleteProduct
)

export default router