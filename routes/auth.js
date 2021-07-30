const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userModel = require("../models/User");
const router = new express.Router();
const SALT=9;


router.post("/signup", async (req, res, next) => {
    
    try{
        const user = req.body;
        if(!user.lastname || !user.firstname || !user.password || !user.email) {
            console.log("I am here");
            res.render('signup.hbs');
            return;
        }

        const foundUser = await userModel.findOne({email:user.email});
        
        if (foundUser){
            res.render('signup.hbs', {msg:{status:"ERROR:", text:"This e-mail is already used. Please choose another one"}});
            return;
        }

        //If it is a new new user encrypt the pswd and give it to the user
        const hashedPassword = bcrypt.hashSync(user.password, SALT);
        user.password=hashedPassword;
        
        //Inject the new user to our database
        userModel.create(user)
            .then((createdUser)=>{
                console.log("new User:");
                console.log(createdUser);
                res.redirect('/signin');})
            .catch((error)=>{console.log(error)})

    }
    catch (error) {next(error);}

    //res.render("signup");
  });

  router.post("/signin", async (req, res, next) => {
    
    try{
        const user = req.body;
        if(!user.password || !user.email) {
            res.render('signin.hbs');
            return;
        }

        const foundUser = await userModel.findOne({email:user.email});
        
        if (!foundUser){
            res.render('signin.hbs', {msg:{status:"ERROR:", text:"Bed Credentials"}});
            return;
        }

        //If it is a new new user encrypt the pswd and give it to the user
        
        const isValidPassword = bcrypt.compareSync(user.password, foundUser.password);
        
        if (isValidPassword){
            req.session.currentUser = {_id:foundUser._id};
            res.redirect("/");
        }
        
        else{
            res.render('signin.hbs', {msg:{status:"ERROR:", text:"Bed Credentials"}});
            return;
        }
  
    }
    catch (error) {next(error);}

    //res.render("signup");
  });




module.exports = router;
