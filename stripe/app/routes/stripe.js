var express = require('express')
var router = express.Router()
const { check} = require("express-validator");
const db = require("../models");
const User = db.user;

const {stripeSubscription} = require("../controllers/stripe");
const {verifyToken,isAccountCheck,roleCheck} = require("../middleware/auth");


router.post("/stripe",verifyToken,[
    check("number").notEmpty(),
    check("exp_month").notEmpty(),
    check("exp_year").notEmpty(),
    check("cvc").notEmpty(),
    check("billing_details_name").notEmpty(),
    check("public_id").notEmpty(),
    check("customerId").notEmpty(),
    check("priceId").notEmpty(),
],stripeSubscription);

module.exports = router;
