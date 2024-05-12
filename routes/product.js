const express=require('express');
const {getAllProducts,getProductById,postProduct,deleteProduct,updateProduct}=require('../controllers/product_controller');
const {body,param}=require('express-validator');
const productRoute=express.Router();

const validationSchemaForProduct = [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('price').isNumeric().withMessage('Price must be a valid number'),
    body('quantity').isNumeric().withMessage('Quantity must be a valid number'),
    body('supplier').isLength({ min: 5 }).withMessage('Supplier name must be at least 5 characters long'),
    body('categeory').isLength({ min: 4 }).withMessage('Categeory name must be at least 4 characters long'),
    body('description').isLength({ min: 10 }).withMessage('Description must be at least 10 characters long')
];


const validationForId=[
    param('id').isAlphanumeric().isLength({min:24,max:25}).withMessage("Wrong id must contain only letters and numbers and 24 characters long"),
];



productRoute.post("/",validationSchemaForProduct,postProduct);


productRoute.patch('/:id',[validationForId,validationSchemaForProduct],updateProduct);


productRoute.delete("/:id",validationForId,deleteProduct);


productRoute.get("/:id",validationForId,getProductById);


productRoute.get('/',getAllProducts);


module.exports={
    productRoute,
}