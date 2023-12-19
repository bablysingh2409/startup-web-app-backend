const Startup = require('../model/startup');

const startupController = {
    getAllStartup:async(req,res)=>{
        try{
            const data=await Startup.find();
            res.status(200).json(data);
        }
        catch(err){
            console.log('errr',err)
        }
    }


}

module.exports=startupController;

