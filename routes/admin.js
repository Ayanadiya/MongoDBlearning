const express=require('express');

const adminController=require('../controller/admin');

const router=express.Router();

 router.post('/addproduct', adminController.postProduct);

 router.put('/editproduct/:Id', adminController.editproduct);

 router.put('/deleteproduct/:Id', adminController.deleteproduct);

module.exports=router;