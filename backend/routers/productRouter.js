import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async(req, res) => {
    const products = await Product.find({});
    res.send(products);
}));


productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    //await Product.remove({});
    const  createdProducts = await Product.insertMany(data.products);
    res.send({createdProducts});
    //const productsInMongo = await Product.find({},{"name":1});
    //res.send(productsInMongo);

/*
    for (var i = 0; i<productsInMongo.length; i++) {
        var arrlen = data.products.length;
        for (var j = 0; j<arrlen; j++) {
            if (productsInMongo[i].name !== data.products[j].name) {
                newArr = data.products[j];
            }
        }
    }

    if(newArr.length > 0) {
        createdProducts = await Product.insertMany(newArr);
    } else {
        return null;
    }
*/
    
    
}));




productRouter.get('/:id', expressAsyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.send(status).send({ message: 'Ürün bulunamadı!' })
    }
    
}));

export default productRouter;