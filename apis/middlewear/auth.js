import { userModel } from '../DB/model/user.model.js' ;
 import jwt from 'jsonwebtoken';        // npm i jsonwebtoken 

 export const auth =()=>{
    return async(req,res,next)=>{
        try{ 
        const {token} = req.headers;
        if (!token.startsWith( process.env.bearerToken)){
            res.status(400).json({message:"invalid beraer token"})
        }else{
           const  mytoken = token.split(process.env.bearerToken)[1];
            const decoded =jwt.verify(mytoken , process.env.tokenLogin)
            if(!decoded.id){
                res.status(400).json({message:"invalid token paylod"})
            }else{
                const user = await userModel.findById(decoded.id).select("_id");
                if(!user){
                res.status(401).json({message:"not regestered user"})
                }else{
                    req.user = user
                    next();            
                }
            }
        }
    } catch (error) {
        res.json({ message: "auth catch error", error })
    }

    } 
}
 