const express=require('express');

const shopController=require('../controller/shop');

const router=express.Router();

router.get('/getproducts', shopController.getProducts);

router.get('/getproduct/:Id', shopController.getProductbyId);

router.post('/cart/:Id', shopController.addtocart);

module.exports=router;