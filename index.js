import express from "express";
import bodyPer from "body-parser"
import bodyParser from "body-parser";


//setting port connection 

const app = express();
const port = 3000;

//setting the listening port 
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})
