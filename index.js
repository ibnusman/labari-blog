import express from "express";
import bodyPer from "body-parser"
import bodyParser from "body-parser";


//setting port connection 

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

//setting the listening port 
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})
