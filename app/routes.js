const express = require('express');
const router = new express.Router;

const middlewareAuth  = require("./middlewares/auth");

const App = require('./controllers/app/app');
const Car = require('./controllers/car/car');
const Brand = require('./controllers/brand/brand');
const Rent = require('./controllers/rent/rent');
const Model = require('./controllers/model/model');
const User = require('./controllers/user/user');
const Address = require('./controllers/address/address');
const Register = require('./controllers/register/register');
const Auth = require('./controllers/auth/auth');
const Card = require('./controllers/card/card');
const Billet = require('./controllers/billet/billet');
const RentalCompany = require('./controllers/rentalCompany/rentalCompany');
const Payment = require('./controllers/payment/payment');
const NFCe = require('./controllers/nfce/nfce');

// Test
router.get('/',[middlewareAuth.verifyToken],App.test);

// App
router.post('/app', App.create);
router.get('/apps', App.find);

// Brand
router.post('/brand', Brand.create);
router.get('/brands', Brand.find);
router.get('/brand/:id/models', Brand.modelsByBrand);

// Model routes
router.post('/brand/:id/model', Model.create);
router.get('/model/:id/brand', Model.brandByModel);

// Card
router.post("/cards", [middlewareAuth.verifyToken], Card.create);
router.get("/cards", [middlewareAuth.verifyToken], Card.findCardsByUser);
router.get("/cards/:id", [middlewareAuth.verifyToken], Card.findCardById);

// Billet
router.post("/billets",[middlewareAuth.verifyToken], Billet.create);
router.get("/billets",[middlewareAuth.verifyToken], Billet.find);
router.get("/billets/:id",[middlewareAuth.verifyToken], Billet.findById);

// Payment
router.post('/payment/card',[middlewareAuth.verifyToken], Payment.payWithCard);
router.post('/payment/billet',[middlewareAuth.verifyToken], Payment.payWithBillet);
router.get('/payment/:id',[middlewareAuth.verifyToken], Payment.findPaymentById);

// Rent
router.post('/rents', [middlewareAuth.verifyToken], Rent.create);
router.get('/rents', [middlewareAuth.verifyToken], Rent.find);
router.get('/rents/:id', [middlewareAuth.verifyToken], Rent.findById);
//router.put('/rents', [middlewareAuth.verifyToken], Rent.findById);

// Rental Company
router.post("/rental-company", RentalCompany.create);
router.get("/rental-company", RentalCompany.find);
router.get("/rental-company/:id", RentalCompany.findById);

// Car
router.post('/cars', Car.create);
router.get('/cars', Car.list);
router.post('/cars/search', Car.search);
router.get('/cars/:id', Car.getCar);

// User routes
router.post('/user/register', Register.register);
router.get('/user',[middlewareAuth.verifyToken], Register.getUser);
router.put('/user',[middlewareAuth.verifyToken], Register.setUser);

// Address routes
router.get('/address/:id', Address.findAddressById);


// Auth routes
router.post("/authenticate/signup", Register.register);
router.post("/authenticate/signin", Auth.signin);

// NFC-e routes'
router.post("/nfce/decode", [middlewareAuth.verifyToken], NFCe.decode);

module.exports = router;