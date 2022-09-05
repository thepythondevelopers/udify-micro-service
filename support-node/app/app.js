require('dotenv').config();

const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");


//Routes
const supportRoutes = require("./routes/support");


const path = require("path");

app.use(express.static('uploads/avatar')); 
app.use('/uploads/avatar', express.static('uploads/avatar'));
app.use(express.static('uploads/email')); 
app.use('/uploads/email', express.static('uploads/email'));
app.use(express.static('uploads/support')); 
app.use('/uploads/support', express.static('uploads/support'));

const port = 80;

app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(cookieParser());
app.use(cors());

//My Routes


app.use('/',supportRoutes);


const db = require("./models");




app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
});

