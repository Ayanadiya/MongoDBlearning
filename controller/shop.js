const Product=require('../models/products');
const User=require('../models/user');

exports.getProducts= async (req,res,next) => {
    try {
        const products= await Product.fetchAll();
        console.log("Products sending to frotend", products)
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getProductbyId= async (req,res,next) => {
    try {
        const prodId=req.params.Id;
        const product=await Product.findById(prodId);
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.addtocart= async (req,res,next) => {
    try {
        const prodId=req.params.Id;
        const product= await Product.findById(prodId);
        const cart= await req.user.addtocart(product);
        res.status(200).json('Product added to cart');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}