require('dotenv').config();

const express = require("express");
//var mysql = require('mysql');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");


//Routes
const adminUser = require("./routes/admin/user");
const userRoutes = require("./routes/user");


const path = require("path");



app.use(express.static('uploads/avatar')); 
app.use('/uploads/avatar', express.static('uploads/avatar'));








const port = process.env.PORT || 8000;

app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(cookieParser());
app.use(cors());

//My Routes


app.use('/api',userRoutes);
app.use('/api',adminUser);

const db = require("./models");




app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
});

