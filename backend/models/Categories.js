const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    id:{
        "type":Number,
    },
    name:{
        type:String,
    }
})

const Category = mongoose.model('Category',CategorySchema);

module.exports={Category}