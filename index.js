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

app.post("/edit", (req, res) => {
  const post = blogs.find(blog => blog.title === req.body.title); // Find the post to edit
 
  if (post) {
    res.render("edit.ejs", { post });  // Send the post data to the 'edit' view
  } else {
    res.status(404).send("Blog post not found");
  }
});

app.get("/write",(req,res)=>{
    res.render("write.ejs");

});
app.post("/update-post", (req,res)=>{


  const { originalTitle, title, brief, content } = req.body;

  // Find the post using the original title
  const post = blogs.find(blog => blog.title === originalTitle);

  if (post) {
    post.title = title || post.title;
    post.brief = brief || post.brief;
    post.content = content || post.content;


    res.redirect("/");
  } else {
   
    res.status(404).send("Blog post not found");
  }


});

app.post("/delete-post", (req, res) => {
  const { title } = req.body;
  console.log("Title to delete:", title);

  // Find the index of the blog post by title
  const postIndex = blogs.findIndex(blog => blog.title === title);
  
  if (postIndex !== -1) {
    // Remove the post from the array
    blogs.splice(postIndex, 1);
  
    res.redirect("/");  // Redirect to the homepage after deletion
  } else {
    res.status(404).send("Blog post not found");
  }
});
//setting the listening port 
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})
