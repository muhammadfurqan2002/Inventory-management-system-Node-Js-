const { productModel } = require('../models/product');
const { validationResult } = require('express-validator')

async function getAllProducts(req, res, next) {

    try {

        const queryObj = getQueryObject(req.query);
        console.log(queryObj);
        let products = productModel.find(queryObj);
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            products = products.sort(sortBy);
        }else{
            products=products.sort('-createdAt')
        }

        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;

        const productList = await products.skip(skip).limit(limit);

        return res.status(200).json({ message: 'Success', data: productList, page: page, limit: limit });
    } catch (e) {
        next(e);
    }
}

function getQueryObject(queryObject) {
    const excludeObj = ["sort", "page", "limit", "fields",];
    var queryObj = { ...queryObject };

    excludeObj.forEach((element) => {
        delete queryObj[element]
    });
    var queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);
    queryObj = JSON.parse(queryStr);

    return queryObj;
}


async function getProductById(req, res,next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const id = req.params.id;
        const product = await productModel.findById(id);
        return res.status(200).json({ message: 'Success', data: product });
    }catch(e){
        next(e);
    }
   
}

async function deleteProduct(req, res,next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const delProduct = await productModel.findOneAndDelete(req.params.id);
        return res.status(200).json({ message: 'Success', data: { id: req.params.id } });
    }catch(e){
        next(e);
    }

 
}


async function postProduct(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const { name, supplier, price, quantity, description, categeory } = req.body;

        const product = await productModel.create({
            name,
            supplier,
            price,
            quantity,
            categeory,
            description
        });
        return res.status(201).json({ message: 'Created', data: product });
    
    }catch(e){
        next(e);
    }   
}



async function updateProduct(req, res) {

    const id = req.params.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const { name, supplier, price, quantity, description, categeory } = req.body;
        const product = await productModel.findByIdAndUpdate(id, {
            supplier,
            price,
            name,
            quantity,
            categeory,
            description
        });
        return res.status(200).json({ message: 'Updated', data: product });
    }catch(e){
        next(e);
    }
    
}



module.exports = {
    getAllProducts,
    updateProduct,
    deleteProduct,
    postProduct,
    getProductById
}