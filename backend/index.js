const express= require('express');
const app = express();
require('dotenv').config();
const port =process.env.PORT ||5000;
const cors = require('cors');
app.use(cors(corsOptions));
const corsOptions= {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    
}