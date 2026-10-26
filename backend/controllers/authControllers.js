import { User } from "../models/User.js";
import { Project} from "../models/Project.js";

//issue an otp and send it via email
async function issueAndSend(email,name,status,res,code=201) {
    const otp= generateOtp();
    saveOtp(email, otp);
    await sendOtpEmail({to: email, name, code:otp, purpose: status});
    return res.status(code).json({ok: true, email});
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

                return issueAndSend(email, existing.name, "signup", res, 200);
        }
        const user = await User.create({
            name,
            email,
            passwordHash: await User.hashPassword(password),
            emailVerified: false
        });
        return issueAndSend(user.email, user.name, "signup", res, 201);
    }
  
    catch (error){
        next(err);
    }
}

//verify the otp and make user verified
export async function verifyRegister(req, res, next) {
    try{
    const {email, code}=req.body;
    if(!email || !code)
        return res.status(400).json({
            error: "Email and code are required."
    });

    const user = await User.findOne({email});
    if(!user)
        return res.status(404).json({
            error:"No account found with this email."
        });
        if(user.emailVerified)
            return res.json({ok: true, alreadyVerified: true});

        const result= verifyOtp
    }

    catch(error){
    }
}