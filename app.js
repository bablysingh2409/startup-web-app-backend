const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const csv = require('csvtojson')
const mongoose = require('mongoose');
const Startup = require('./model/startup');
const startupRoutes=require('./routes/startupRoutes');



app.use(cors())
app.use(express.json());

app.use('',startupRoutes);


//connecting to mongoDB
mongoose.connect('mongodb://localhost:27017/Startups', { useNewUrlParser: true, useUnifiedTopology: true })

// Flag to check if data has been processed
let isDataProcessed = false;
const dir = path.join(__dirname, '/public/uploads/startup_funding.csv');
async function processData() {
    try {
        const data = await csv().fromFile(dir);

        //saving .cvs file data in data base only for one time
        for (const response of data) {
          const newStartup = new Startup({
            company_name: response.StartupName,
            city: response.CityLocation,
            starting_year: response.Date,
            founders: response.InvestorsName,
            industry: response.IndustryVertical,
            funding_amount: response.AmountInUSD
          });

          const saveData = await newStartup.save();
        
        console.log(saveData);
        }
         // Updating the flag after data processing
        isDataProcessed = true;
        console.log('Data processing complete.');
    } catch (err) {
        console.error('Error processing data:', err);
    } finally {
        // Closing the MongoDB connection after processing
        mongoose.connection.close();
    }
}
app.use((req, res, next) => {
  if (!isDataProcessed) {
      processData();
  }
  next();
});
 

// app.use(express.static(path.resolve(__dirname,'public')));


//first i uploaded the startup_funding.csv file
// let storage=multer.diskStorage(
// {
//     destination:(req,file,cb)=>{
//        cb(null,'./public/uploads')
//     },
//     filename:(req,file,cb)=>{
//           cb(null,file.originalname)
//     }
// }
// )

// let upload=multer({storage});

// app.post('/importuser',upload.single('file'),async(req,res)=>{
//      try{ 
//         csv()
//         .fromFile(req.file.path)
//         .then((response)=>{
//             console.log(response);
//         })  
//     res.send('file uploaded successfully');
//      }
//      catch(err){
//         res.send('errorr',err)
//      }
// })



module.exports = app