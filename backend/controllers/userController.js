import User from "../model/user.js"
import bcrypt from 'bcrypt';

export const signup = async(req,res)=>{
    try {  
        const{userName,email,password} = req.body
        console.log(req.body)
        if(!userName||!email||!password){ 
            return res.status(400).json({
                success:false,
                msg:"All fields are required"
            })
        }
        const user = await User.findOne({email})
        if (user){
            return res.status(409).json({
                msg:"Email already exist"
            })
        }
        const hashedPassword = await bcrypt.hash(password,12)
        if (!user){
        await User.create({
            userName,
            email,
            password:hashedPassword
        })
        }
        return res.status(200).json({
            message: "user created",
            success:true
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const login = async(req,res) => {
    try {
        const {email,password} = req.body;
        console.log(req.body)
        if(!email || !password) {
            return res.status(409).json({
                message: "All field are required",
                success: false
            })
        }
        const user = await User.findOne({email})
        if (!user){
            return res.status(403).json({
                message: "Your email or password is incorrect!",
                success: false
            })
        }

        const isPasswordMatched = await bcrypt.compare(password,user.password)
        if(!isPasswordMatched) {
            return res.status(403).json({
                message: "Your password is incorrect!",
                success:false
            })
        }

        return res.status(200).json({
            message:"User logged in",
            success: true
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}