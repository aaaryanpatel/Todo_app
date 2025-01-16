import User  from "../model/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        console.log(req.body); // Debugging statement

        if (!userName || !email || !password) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required"
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({
                msg: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            userName,
            email,
            password: hashedPassword
        });

        return res.status(200).json({
            message: "User created",
            success: true
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            msg: "Server error"
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(403).json({
                message: "Your password is incorrect!",
                success: false
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.status(200).cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000
        }).json({
            message: "User logged in",
            success: true,
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            msg: "Server error"
        });
    }
};


export const logout = (req, res) => {
    try {
        return res.status(200).cookie(
            "token" , "", { maxAge:0 }
        ).json({
            success: true,
            Message: "user loggedout"
        })

        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            msg: "Server error"
        });
    }
}

