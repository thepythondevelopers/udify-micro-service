var express = require('express')
var router = express.Router()
const { check} = require("express-validator");
const db = require("../models");
const User = db.user;

const {syncOrder} = require("../controllers/shopify_order");
const {verifyToken,isAccountCheck,roleCheck,checkStoreId} = require("../middleware/auth");


router.get("/sync-order/:integration_id",verifyToken,syncOrder);


module.exports = router;
