import express from "express";
import bodyParser from "body-parser";
import { writeFile } from 'node:fs';
import { title } from "node:process";

//setting port connection 

const app = express();
const port = 3000;

//setting the system to route the public folder
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//creating an arry for the blogs
let blogs=[];
let test1;



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


app.post("/edit",(req,res)=>{
 const post = blogs.find(blog => blogs.title === req.body.title);  // Find the post to edit
    console.log(post)  // Find the post to edit
    res.render("edit.ejs", { post });  // Send the post data to the 'edit' view
});


app.get("/write",(req,res)=>{
    res.render("write.ejs");

});
app.post("/update-post", (req,res)=>{
    const updatePost = blogs.map(blog =>{
        blogs.title === req.body.title;
    });
 const {title, brief, content } = req.body;
 const post = blogs.find(blog => blogs.title === req.body.title);  // Find the post to edit

 if(post)
 {
 post.title = title || post.title;
 post.brief = brief || post.brief;
 post.content= content || post.content;

 res.redirect("/");
 }
 else{
    res.status(404).send("Not found");
 }



 console.log(blogs.title);
 //res.render("index.ejs",{posts:blogs});
});
//setting the listening port 
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})
