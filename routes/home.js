const express=require('express');

const homeController=require('../controller/home');

const router=express.Router();

router.get('/', homeController.getshoppage);

router.get('/admin', homeController.getadminpage);

router.get('/cart', homeController.getcartpage);

router.get('/orders', homeController.getorderpage);

module.exports=router;