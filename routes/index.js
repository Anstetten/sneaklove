const express = require('express');
const Sneaker = require('../models/Sneaker');
const User = require('../models/User');
const router = express.Router();
const tagModel = require('../models/Tag');

router.get('/', (req, res) => {
  res.render('index.hbs');
});

router.get('/sneakers/collection', (req, res) => {
  Sneaker.find()
    .then((dbRes) => {

      tagModel.find()
          .then((foundTags)=>{
            let tagsList=foundTags;
            res.render('products.hbs', {sneakers: dbRes, tags :tagsList,});          
          })
          .catch((error)=>console.log(error));
      
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/sneakers/:category', (req, res) => {
  const category = req.params.category;

  Sneaker.find({ category: category })
    .populate('id_tags')
    .then((dbRes) => {
      let foundSneakers = dbRes;
      let tagsList = [];

      foundSneakers.forEach((sneaker)=>{
        sneaker.id_tags.forEach((tag)=>{
          tagsList.push(tag);
        })
      })
      let tagSet = new Set(tagsList);
      let tagsArray= [...tagSet];
      console.log(tagsArray);

      res.render('products.hbs', {
        sneakers: dbRes,
        tags: tagsArray,
      });
    })
    .catch((error) => {
      console.log(error);
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



//Display add new product page and fetch all tags in db
router.get('/prod-add', (req, res, next) => {
  let tagsList=[];

  tagModel.find()
    .then((foundTags)=>{
      tagsList=foundTags;
      console.log(tagsList);
      res.render('products_add.hbs', {scripts:["addProduct.js",],tags : tagsList,});

    })
    .catch((error)=>console.log(error))
});

//Add new product to database
router.post('/prod-add', (req, res, next) => {
  Sneaker.create(req.body)
    .then((createdProduct) => {
      console.log(createdProduct);
      console.log(req.body);
      //res.redirect('/sneakers/collection');
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/prod-manage', (req, res, next) => {
  Sneaker.find()
    .then((dbRes) => {
      res.render('products_manage.hbs', {
        sneakers: dbRes,
      });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
