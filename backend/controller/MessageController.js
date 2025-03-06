const Message= require('../models/Message');

const sendMessage= async (req,res)=>{
    try {
        const {sender,receiver,message}=req.body;
        const newMessage= new Message({
            sender,
            receiver,
            message,
        });
        await newMessage.save();
        res.status(201).json({message:'Message sent',newMessage});
    } catch (error) {
        res.status(500).json({message:'Internal server error'});
    }
};

const getMessage= async (req,res)=>{
    try {
       const {sender,receiver}=req.query;
       const messages= await Message.find({
           $or:[
            {sender,receiver},
            {sender:receiver,receiver:sender}
           ],
       }).sort({createdAt:1});
         res.status(200).json({messages}); 
    } catch (error) {
        res.status(500).json({message:'Internal server error'});
        
    }
}

const deleteMessage= async (req,res)=>{
    try {
        const {id}=req.params;
        await Message.findByIdAndDelete(id);
        res.status(200).json({message:'Message deleted successfully'});
    }catch(error){
        res.status(500).json({message:'Internal server error'});
    }
}

const updateMessage= async (req,res)=>{
    try {
        const {id}=req.params;
        const {message}=req.body;
        await Message.findByIdAndUpdate
        (id,{message});
        res.status(200).json({message:'Message updated successfully'});
    }catch(error){
        res.status(500).json({message:'Internal server error'});
    }
}

module.exports= {sendMessage,getMessage,deleteMessage,updateMessage};