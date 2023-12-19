const express=require('express');
const router=express.Router();
const startupController=require('../controller/startupController');


router.get('/startups',startupController.getAllStartups);
router.get('/startups/:industry',startupController.getStartupByIndustry);
router.post('/createstartup',startupController.createNewStartup);

module.exports=router;

