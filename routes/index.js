const express = require('express');
const Sneaker = require('../models/Sneaker');
const User = require('../models/User');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.hbs');
});

router.get('/sneakers/collection', (req, res) => {
  Sneaker.find()
    .then((dbRes) => {
      res.render('products.hbs', {
        sneakers: dbRes,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/sneakers/:category', (req, res) => {
  //console.log(req.params.category);
  Sneaker()
    .find(req.params.category === 'men')
    .then((dbRes) => {
      res.render('products.hbs', {
        sneakerMen: dbRes,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/one-product/:id', (req, res) => {
  //console.log(req.params);

  Sneaker.findById(req.params.id)
    .then((dbRes) => {
      res.render('one_product.hbs', {
        sneaker: dbRes,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/signin', (req, res) => {
  res.render('signin');
});

router.get('/prod-add', (req, res, next) => {
  res.render('products_add.hbs', {scripts:["addProduct.js",]});
});

router.get('/prod-manage', (req, res, next) => {
  res.render('products_manage.hbs');
});

module.exports = router;
