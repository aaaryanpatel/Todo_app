import User from "../model/user.js"


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
        if (!user){
        await User.create({
            userName,
            email,
            password
        })
        }
        return res.status(200).json({
            message: "user created",
            user:true
        })
        
    } catch (error) {
        console.log(error.message)
    }
}

export const login = (req,res) => {
    
}