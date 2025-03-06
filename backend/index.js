const express= require('express');
const app = express();
require('dotenv').config();
const port =process.env.PORT ||5000;
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute=require('./routes/UserRoute')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect(process.env.MONGODB_URI, {UseUnifiedTopology:true,useNewUrlParser:true})
.then(()=>console.log('Connected to MongoDB'))
.catch(err=>console.log(err));
const corsOptions= {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,   
}
app.use(cors(corsOptions));
app.use('/user',userRoute);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})