const express = require('express');
const Sneaker = require('../models/Sneaker');
const tagModel = require('../models/Tag');
const router = express.Router();


router.post('/tags/filter', async (req, res) => {
   
    let tagList = [req.body.list];
    console.log(tagList);

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