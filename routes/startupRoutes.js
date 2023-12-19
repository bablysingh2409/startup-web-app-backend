const express=require('express');
const router=express.Router();
const startupController=require('../controller/startupController');


router.get('/startup',startupController.getAllStartup);

module.exports=router;

