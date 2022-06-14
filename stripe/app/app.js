require('dotenv').config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const redis = require('redis');

//Routes
const adminUser = require("./routes/admin/user");
const stripeRoutes = require("./routes/stripe");
const planRoutes = require("./routes/plan");
const syncOrderShopifyRoutes = require("./routes/order_sync");
const syncShopifyRoutes = require("./routes/sync_shopify");
const shopifyRoutes = require("./routes/shopify");
const accountRoutes = require("./routes/account");
const integrationRoutes = require("./routes/integration");
const plaidRoutes = require("./routes/plaid");
const userRoutes = require("./routes/user");
const shopifyProductRoutes = require("./routes/shopify_product");

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

app.use('/api/shopify',shopifyRoutes);
app.use('/api',accountRoutes);
app.use('/api',integrationRoutes);
app.use('/api',plaidRoutes);
app.use('/api',userRoutes);
app.use('/api',syncShopifyRoutes);
app.use('/api',syncOrderShopifyRoutes);
app.use('/api',shopifyProductRoutes);
app.use('/api',planRoutes);
app.use('/api',stripeRoutes);
app.use('/api',adminUser);

const db = require("./models");

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
});

