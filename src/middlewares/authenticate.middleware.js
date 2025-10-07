// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// export default function authenticate(req,res,next){
//     const authHeader = req.headers.authorization;
//     if(!authHeader) return res.status(401).json({message:"No token provided."});
//     const token = authHeader.split(" ")[1];

//     try{
//         const decoded = jwt.verify(token,process.env.JWT_SECRET);
//         req.admin = decoded;
//         next();
//     }catch(err){
//         res.status(401).json({error:"Invalid token",err});
//     }

// }


//check

// middlewares/authenticate.js
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();
// export default function authenticate(req, res, next) {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Attach user info to request
//     req.user = {
//       id: decoded.id,        // user/superadmin ID from token
//       email: decoded.email,  // optional
//       role: decoded.role     // optional
//     };

//     next();
//   } catch (error) {
//     console.error("JWT Authentication Error:", error.message);
//     return res.status(401).json({ success: false, message: "Invalid token" });
//   }
// }


import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded",decoded);
    

    req.user = {
      id: decoded.userId,        // Super Admin ID //change
      name: decoded.name,
      email: decoded.email
    };
    console.log("Authenticated User:", req.user);

    next();
  } catch (error) {
    console.error("JWT Authentication Error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}


