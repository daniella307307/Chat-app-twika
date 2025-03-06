const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = 'test';
const register= async(req,res)=>{

    try {
       const {email, password, username} = req.body;
       const salt= bcrypt.genSalt(10);
       const hashedPassword= bcrypt.hash(password,salt);
       const existingUser= await User.findOne({email: email, password: hashedPassword});
       if(existingUser){
           return res.status(400).json({message: 'User already exists'});
       }
       const user= new User({
        email: email,
        password: hashedPassword,
        username: username
       })
       user.save();
         res.status(201).json({"message":"USER CREATED",user});
    } catch (error) {
        console.log(error);
    }
}

const login= async(req,res)=>{
    try {
        const {identifier, password}=req.body;
        const existingUser= await User.findOne({email: identifier});
        if(!existingUser){
            return res.status(404).json({message: 'User does not exist'});
        }
        const hashedPassword= bcrypt.hash(password,10);
        const isPasswordCorrect= await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: 'Invalid credentials'});
        }
        const token= jwt.sign({email: existingUser.email, id: existingUser._id}, SECRET_KEY, {expiresIn: '24h'});
        res.status(200).json({result: existingUser, token});
    } catch (error) {
        console.log(error);
    }
}

module.exports={register,login};