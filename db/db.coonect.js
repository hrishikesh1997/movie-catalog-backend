const mongoose =require("mongoose")
require("dotenv").config()

const mongoUri = process.env.MONGODB


  const initializedatabase = ()=>{
    mongoose.connect(mongoUri).then(()=>{
        console.log("connected to Database")
    }).catch((error)=>{
        console.log("error during connecting to database",error)
    })
    
  }

  module.exports = {initializedatabase}

