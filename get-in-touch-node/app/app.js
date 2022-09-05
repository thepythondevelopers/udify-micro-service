require('dotenv').config();

const express = require("express");
//var mysql = require('mysql');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");


//Routes
const getInTouchRoutes = require("./routes/get_in_touch");


const path = require("path");

const port = 80;

app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(cookieParser());
app.use(cors());

//My Routes


app.use('/api',getInTouchRoutes);


const db = require("./models");




app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
});

