const Category = require('../models/Categories');

const getAll =async(req,res)=>{
    try {
        const categories = Category.find({});
    if(categories.length >0){
        res.status(200).json({categories});
    }
    else{
        res.json({'message':"no message was found"});
    }
    } catch (error) {
       res.status(500).json({"message":"Internal server error"}); 
    }

}

module.exports={getAll};