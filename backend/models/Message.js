const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MessageSchema= new Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    message:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
},{
    timestamps:true,
})
module.exports=mongoose.model('Message',MessageSchema);