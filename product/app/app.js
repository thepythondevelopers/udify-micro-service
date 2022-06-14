require('dotenv').config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const redis = require('redis');

//Routes
const shopifyProductRoutes = require("./routes/shopify_product");
const shopifyRoutes = require("./routes/shopify");

const port = process.env.PORT || 8000;

app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(cookieParser());
app.use(cors());

//My Routes

app.use('/api',shopifyProductRoutes);
app.use('/api/shopify',shopifyRoutes);

const db = require("./models");

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
});

