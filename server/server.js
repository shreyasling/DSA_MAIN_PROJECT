import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import categoryroutes from "./Routes/categoryroutes.js"
import questionsroutes from "./Routes/questionsroutes.js"
import dataroutes from "./Routes/dataroutes.js"
dotenv.config();

import cors from 'cors'


mongoose.connect(process.env.MONGOURL)
.then(()=>{
    console.log('sedfghj');
})
.catch((err)=>{
    console.log(err);
})

const app=express()
app.use(cors());
app.use(bodyParser.json())

app.use('/category',categoryroutes)
app.use('/questions',questionsroutes)
app.use('/data',dataroutes)

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`connected ${PORT}`)
}
)

