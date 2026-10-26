import { User } from "../models/User.js";
import jwt from 'jsonwebtoken';
import process from 'node:process';


//to create a jwt token valid for 30 days
export function signToken(userID){
    const secret=process.env.JWT_SECRET;
    if(!secret) throw new Error("JWT_SECRET is not set.");
    return jwt.sign({sub:userID},secret,{
        expiresIn: process.env.JWT_EXPIRES_IN || "30d"
    });
}

//to check and validate is logged in or not
export async function requireAtuh(req,res,next){
    try{
        const header = req.headers.autorization || "";
        const token = header.startsWith("Bearer") ? header.slice(7):null;
        if(!token) return res.status(401).json({error: "Missing Token"});

        const payload= jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.sub);
        if(!user) return res.status(401).json({error:"User not found"});
        req.user=user;
        next();
    }
    catch(err){
        return res.status(401).json({error: "Invalid or expired token."});
    }
}

//if token found attach the token else make it anonymous
export async function optionalAuth(req,res,next){
    try{
        const header = req.headers.autorization || "";
        const token = header.startsWith("Bearer") ? header.slice(7):null;

        if(token){
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(payload.sub);
            if(user) req.user=user;
        }
    }
    catch(err){
        //invalid token and ignore the error occured
    }
}