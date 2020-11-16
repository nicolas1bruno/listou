const express = require('express');
const router = new express.Router;

const middlewareAuth  = require("./middlewares/auth");

const Register = require('./controllers/register/register');
const Auth = require('./controllers/auth/auth');
const NFCe = require('./controllers/nfce/nfce');
const Category = require('./controllers/category/category');
const Product = require('./controllers/product/product');
const Item = require('./controllers/item/item');

// Usee
router.post('/user/register', Register.register);
//router.get('/user',[middlewareAuth.verifyToken], Register.getUser);
//router.put('/user',[middlewareAuth.verifyToken], Register.setUser);

// Auth
router.post("/authenticate/signin", Auth.signin);
//router.post("/authenticate/signup", Register.register);

// NFC-e
router.post("/nfce/new", [middlewareAuth.verifyToken], NFCe.new);

// Category
router.post("/category", [middlewareAuth.verifyToken], Category.create);
router.get("/categories", [middlewareAuth.verifyToken], Category.find);

// Products
router.post("/product", [middlewareAuth.verifyToken], Product.create);
router.get("/products", [middlewareAuth.verifyToken], Product.find);

// Item
router.put("/item", [middlewareAuth.verifyToken], Item.update);

module.exports = router;