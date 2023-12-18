const express=require('express');
const app=express();
const cors=require('cors');
const multer=require('multer');
const path=require('path');
const csv=require('csvtojson')

const dir=path.join(__dirname,'/public/uploads/startup_funding.csv');
    
async  function abc(){
        csv()
        .fromFile(dir)
        .then((response)=>{
            console.log(response);
        })  
    }
// abc();


app.use(cors())
app.use(express.json());

app.use(express.static(path.resolve(__dirname,'public')));


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

module.exports=app