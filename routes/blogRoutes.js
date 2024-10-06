
const express=require('express')
let  checkAuth =require("../middleware/authMiddleware")
let {addBlog,getAllBlog} =require('../controllers/blogController')

let Route=express.Router();

Route.post("/addblog",checkAuth,addBlog)
Route.get("/allblog",checkAuth,getAllBlog)

module.exports=Route