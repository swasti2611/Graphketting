let mongoose = require("mongoose")


let blogSchema=new mongoose.Schema({

 title:{
    type:String,
    required:true
 },

content:{
    type:String,
    required:true
 }
 ,
 author:{
    type:String,
    required:true
 },
 userId:{
   type:mongoose.Schema.Types.ObjectId,
   ref:'User' ,
   required: true
 }

})

let blog=mongoose.model("blog",blogSchema);

module.exports=blog