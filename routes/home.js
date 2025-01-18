const express=require('express');

const homeController=require('../controller/home');

const router=express.Router();

router.get('/', homeController.getshoppage);

router.get('/admin', homeController.getadminpage);

module.exports=router;