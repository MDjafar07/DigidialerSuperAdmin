import bcrypt from "bcrypt";
import pool from "../config/db.js";
import jwt from "jsonwebtoken";
import { findUserByEmail} from "../models/user.model.js";

// superAdmin login
export async function superAdminLogin(req, res) {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        };
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(400).json({
                message: "Incorrect username",
                success: false
            })
        };
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect password",
                success: false
            })
        };
        const tokenData = {
            userId: user.id,
            name :user.name
        };


        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        await pool.query(
            "INSERT INTO auths.access_tokens (user_id, token, expires_at, created_at, revoked) VALUES ($1,$2,$3,NOW(),false)",
            [user.id, token, expiresAt]
        );


        return res.status(200).json({
            message: "Login succesfull",
            _id: user.id,
            token,
            email: user.email,
            name: user.name

        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

export async function logout(req,res) {
    try{
        // get token from header
        const authHeader = req.headers["authorization"];
        if(!authHeader) return res.status(401).json({message:"Token is required"});

        const token = authHeader.split(" ")[1];
        if(!token) return res.status(401).json({message:"Invalid token format"});

        await pool.query(
            "UPDATE auths.access_tokens SET revoked = TRUE WHERE token = $1",
            [token]
        );
        return res.status(201).json({message:"Logout Successful"});
    }catch(err){
        console.log(err.message);
        return res.status(500).json({error:err.message});
    }
}







