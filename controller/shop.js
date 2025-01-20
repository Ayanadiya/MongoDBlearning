const Product=require('../models/products');
const User=require('../models/user');

exports.getProducts= async (req,res,next) => {
    try {
        const products= await Product.find();
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

exports.getcart= async (req,res,next) => {
    try {
        const products= await req.user.getcart();
        console.log(products)
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.deletefromcart= async (req,res,next) => {
    try {
        const Id=req.params.Id;
        await req.user.deletefromcart(Id);
        res.status(200).json("Product removed from cart");
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

exports.placeorders= async (req,res,next) =>{
    try {
        await req.user.addOrder();
        res.status(200).json('Order placed');
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

exports.getorders= async (req,res,next) =>{
    try {
        const orders= await req.user.getorder();
        console.log(orders);
        res.status(200).json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}