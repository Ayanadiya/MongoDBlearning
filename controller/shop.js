const Product=require('../models/products');

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