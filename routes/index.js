const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index.hbs");
});

router.get("/sneakers/collection", (req, res) => {
  res.render("products.hbs");
});

router.get("/sneakers/men", (req, res) => {
  res.render("products.hbs");
});

router.get("/sneakers/women", (req, res) => {
  res.render("products.hbs");
});

router.get("/sneakers/kids", (req, res) => {
  res.render("products.hbs");
});

router.get("/one-product/:id", (req, res) => {
  res.render("one_product.hbs");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});


module.exports = router;
