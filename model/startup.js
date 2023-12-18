const mongoose=require('mongoose');

const startupSchema=new mongoose.Schema ({
    company_name:String,
    city:String,
    starting_year:Date,
    founder:String,
    industry:String,
    funding_amount:Number
});

const Startup=mongoose.model('Startups',startupSchema);

module.exports=Startup;

