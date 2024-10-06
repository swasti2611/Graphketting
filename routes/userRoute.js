
const express=require('express')
const {signIn,logIn}=require("../controllers/userController")
const checkAuth=require("../middleware/authMiddleware")

let Route=express.Router()

Route.post("/signIn",signIn)
Route.post("/login",logIn)

Route.get("/home",checkAuth,(req,res)=>{
    res.send("hello am authenticated")
})



module.exports=Route