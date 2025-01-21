const express=require('express');

const shopController=require('../controller/shop');
const { route } = require('./home');

const router=express.Router();

 router.get('/getproducts', shopController.getProducts);

 router.get('/getproduct/:Id', shopController.getProductbyId);

 router.post('/cart/:Id', shopController.addtocart);

 router.get('/cart', shopController.getcart);

 router.put('/deletefromcart/:Id', shopController.deletefromcart);

// router.post('/placeorder', shopController.placeorders);

// router.get('/orders', shopController.getorders);

module.exports=router;