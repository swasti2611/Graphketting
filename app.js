require("dotenv").config()
const express=require('express')
const userRoute =require("./routes/userRoute")
const blogRoute =require("./routes/blogRoutes")
const {errorHandler}=require("./middleware/errorHandler");
const  mongoose  = require('mongoose');
const cors=require('cors')
let app=express();
let port=5000
//pass=kVZGCs835DsRzZ7q
mongoose.connect("mongodb+srv://roysami690:kVZGCs835DsRzZ7q@cluster0.wuf8w.mongodb.net/myDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));

//roysami690
// R0qozvv2yVF1wLOu
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    res.send("hellow")
})
app.use("/user",userRoute)
app.use("/blog",blogRoute)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`server connected at ${port}`);
    
})

