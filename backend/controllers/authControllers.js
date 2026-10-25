import { User } from "../models/User.js";
import { Project} from "../models/Project.js";

//issue an otp and send it via email
async function issueAndSend(email,name,status,res,code=201) {
    const otp= 
}

//to register a user and send otp
export async function register(req,res,next) {
    try{
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(404).json({
                message: "All fields are required."
            });
        }
        if(name.length < 2)
            return res.status(400).json({
                error: "Name must be atleast of 2 characters."
        });
         if(password.length < 6)
            return res.status(400).json({
        error: "Password length must be at least of 6 characters."
        });

        const existing = await User.findOne({email});
        if(existing){
            if(existing.emailVerified)
                return res.status(409).json({
                    error: "Email already in use,"
                });
        }
    }
  
    catch (error){

    }
}