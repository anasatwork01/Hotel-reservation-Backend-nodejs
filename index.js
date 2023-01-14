const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const express = require("express"); 
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const hotelsRoute = require("./routes/hotels");
const roomsRoute = require("./routes/rooms");
const app = express();

dotenv.config({path:"./config.env"});




const DB = process.env.DATABASE;
mongoose.connect(DB);



//middlewares
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
});


app.get("/",(req,res)=>{
    res.send("Hello First");
})

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Connected to backend! on ${port}`)
})