const express = require('express');
const Sneaker = require('../models/Sneaker');
const tagModel = require('../models/Tag');
const router = express.Router();


router.post('/tags/filter', async (req, res) => {
   
    let tagList = req.body.list;
    console.log(tagList);

    let listOfDisplayed='';

    tagList.forEach((id)=>{
        listOfDisplayed+='"'+id+'",';
    })

    //console.log(`listOfDisplayed`, listOfDisplayed.slice(0,listOfDisplayed.length-1));
    let queryString= listOfDisplayed.slice(0,listOfDisplayed.length-1);
    console.log(`queryString`, queryString);
    const foundShoes = await Sneaker.find({id_tags:{$in:[tagList]}});

    res.send(foundShoes);

    //{"id_tags":{"$in":["men","kids"]}}
    // const foundTag = await tagModel.findOne({label:newTag.label});

    // if (foundTag) { return;}

    // tagModel.create(newTag)
    //     .then((newlyCreatedTag)=>{
    //         res.status(201).json(newlyCreatedTag);
    //         console.log(newlyCreatedTag);
    //     })
    //     .catch((error)=>{; next(error);})
  });

module.exports = router;