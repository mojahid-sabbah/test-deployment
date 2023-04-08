import { messageModel } from "../../../DB/model/message.model.js";
import { userModel } from "../../../DB/model/user.model.js";

export const sendMessage = async (req,res)=>{
    try{
        const {userId} = req.params;
        const {text} = req.body;
        const user = await userModel.findById(userId).select("userName");
        if(!user){
            return res.status(404).json({message:'invalid reciver id'});
        }else{
            const newMessage = new messageModel({text,reciverId:userId});
            const savedMessage = await newMessage.save();
            if(!savedMessage){
            return res.status(400).json({message:"fail to add "});

            }
            return res.status(200).json({message:"success ",savedMessage});
        }
    
    }catch(error){
        return res.status(401).json({message:"catch error",error});
    }
    
}

export const myMessages = async(req,res)=>{

    try{
        const messageList = await messageModel.find({reciverId:req.user._id});
        return res.status(200).json({message:'success',messageList});
    
    }catch(error){
        return res.status(400).json({message:'error'});
    }
}
export const deleteMessage = async(req,res)=>{
    try{
        const {id} = req.params;
        const message= await messageModel.deleteOne({reciverId:req.user._id,_id:id});
        if(message.deletedCount){

            return res.status(200).json({message:'success'});
        }else {
            return res.status(400).json({message:'invalid delete message'});
        }
    }catch(error){
        return res.status(401).json(error)
    }
     
}