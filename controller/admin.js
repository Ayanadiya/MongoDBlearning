const Product=require('../models/products');

exports.postProduct=async (req,res,next) => {
    try {
        const {title,price,description,image}=req.body
        const product=new Product(title,price,description,image);
        const result=await product.save();
        console.log(result);
        res.status(201).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.editproduct= async (req,res,next) =>{
    try {
        const {title,price,description,image}=req.body
        const id=req.params.Id
        const product=new Product(title,price,description,image);
        const result= await product.edit(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.deleteproduct= async (req,res,next) =>{
    try {
        const prodId=req.params.Id
        const result=Product.delete(prodId);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}