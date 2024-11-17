import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";


const app=express();

app.use(express.json());

connectDB();

app.use('api/users',userRoutes)
app.use('api/admin',adminRoutes)

app.get('/',(req,res)=>{
    res.send('Welcome to Assignment submission portal');
});


app.listen(3000,()=>{
    console.log("server listening on port 3000...");
});