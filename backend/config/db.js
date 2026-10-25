import mongoose from "mongoose";

export const connectDB = async ()=>{
    mongoose.connect("mongodb+srv://iamabhaychaurasiya_db_user:VyaMcSkdDrM4jrdK@cluster0.s2loymb.mongodb.net/AI")
    .then (()=>{
        console.log("DB CONNECTED");
    });
};