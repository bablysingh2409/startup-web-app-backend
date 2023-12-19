const mongoose=require('mongoose');

const startupSchema=new mongoose.Schema ({
    company_name:String,
    city:String,
    starting_year:String,
    founders:[String],
    industry:String,
    funding_amount:String
});

const Startup=mongoose.model('Startups',startupSchema);

module.exports=Startup;

