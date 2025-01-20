const Product=require('../models/products');

exports.postProduct=async (req,res,next) => {
    try {
        const {title,price,description,image}=req.body
        const product=new Product({
            title:title,
            price:price,
            description:description,
            imageUrl:image,
            userId:req.user
        });
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
        const updatedproduct={
            title:title,
            price:price,
            description:description,
            imageUrl:image
        }
        const product=await Product.findByIdAndUpdate(id,updatedproduct);
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.deleteproduct= async (req,res,next) =>{
    try {
        const prodId=req.params.Id
        const result= await Product.findByIdAndDelete(prodId);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}