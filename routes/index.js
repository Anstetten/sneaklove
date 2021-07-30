const express = require('express');
const Sneaker = require('../models/Sneaker');
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

router.get('/sneakers/men', (req, res) => {
  //console.log(req.query);
  Sneaker()
    .find(req.query.category === 'men')
    .then((dbRes) => {
      res.render('products.hbs', {
        sneakerMen: dbRes,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/sneakers/women', (req, res) => {
  Sneaker()
    .find(req.query.category === 'women')
    .then((dbRes) => {
      res.render('products.hbs', {
        sneakerMen: dbRes,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/sneakers/kids', (req, res) => {
  Sneaker()
    .find(req.query.category === 'kids')
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

module.exports = router;
