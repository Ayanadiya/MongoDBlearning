const Product=require('../models/products');
const User=require('../models/user');
const Order=require('../models/order');

exports.getProducts= async (req,res,next) => {
    try {
        const products= await Product.find()
        // .select('title price -_id') select is used to choose which fields are to be return and also mention filed to avoid with - sign before them.
        // .populate('userId', 'name'); populate is used to fill data in the field and mention reqiured fields.
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
        const user= await req.user.populate('cart.items.productId');
        console.log(user.cart.items)
        res.status(200).json(user.cart.items);
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
        const user= await req.user.populate('cart.items.productId');
        const products=user.cart.items.map(item =>{
            return {product:{...item.productId._doc}, quantity:item.quantity};
        });
        const order= new Order({
            user:{
                name:req.user.name,
                userId:req.user
            },
            products:products
        })
        await order.save();
        await req.user.clearcart();
        res.status(200).json('Order placed');
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

exports.getorders= async (req,res,next) =>{
    try {
        const orders= await Order.find({'user.userId':req.user._id});
        console.log(orders);
        res.status(200).json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}