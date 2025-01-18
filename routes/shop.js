const express=require('express');

const shopController=require('../controller/shop');

const router=express.Router();

router.get('/getproducts', shopController.getProducts);

router.get('/getproduct/:Id', shopController.getProductbyId);

module.exports=router;