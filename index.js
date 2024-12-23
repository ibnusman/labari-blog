import express from "express";
import bodyParser from "body-parser";
import { writeFile } from 'node:fs';

//setting port connection 

const app = express();
const port = 3000;

//setting the system to route the public folder
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//creating an arry for the blogs
const blogs=[]



//displaying the first page
app.get("/",(req,res)=>{
    res.render("index.ejs",{posts:blogs});
});

//save the post in a txt file  Testing this  
app.post("/create-post",(req,res)=>{
    //pushing all the elements  
    blogs.push(req.body);
    
    // writeFile(`${req.body.title}.txt`, `${req.body.brief} ${req.body.content}  `, 'utf8',()=>{}); 

    res.render("index.ejs", {posts:blogs});
})




app.get("/write",(req,res)=>{
    res.render("write.ejs");

})
//setting the listening port 
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})
