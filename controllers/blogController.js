const asyncErrorHandler =require("../middleware/asyncErrorHandler")
const {customError} =require("../middleware/errorHandler")
const Blog= require("../model/blogModel")


let addBlog=asyncErrorHandler(async(req,res,next)=>{
    const {title,content,author}=req.body 
     console.log(title);
     
   if(!title || ! content || !author){
      return next(new customError("all field are required",400))
   }  
   ///1 check field
   //2 
   console.log(req.user.userId);
   
   let userId=req.user.userId 

   let blog=await Blog.create({title,content,author,userId})

   res.status(201).json({
    message: "Blog added successfully",
    blog
  });



})

let getAllBlog = asyncErrorHandler(async (req, res, next) => {
  // Fetch all blog entries
  let blogs = await Blog.find({});
  
  
  // Send success response
  res.status(200).json({ message: "Blogs retrieved successfully", blogs });
});

module.exports={addBlog,getAllBlog}