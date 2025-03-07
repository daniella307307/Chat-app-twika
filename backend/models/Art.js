const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const ArtSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    countInStock:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    addedAt:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true
})
const Art = mongoose.model("Art", ArtSchema);
module.exports=Art;