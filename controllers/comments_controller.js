const express = require("express");
const router = express.Router();
 
router.use(express.json());

router.use(express.urlencoded({ extended: false }));

const db = require('../models')

router.get("/", (req, res) => {
    Comments.find({})
    
      .populate("comments user")
      .exec((error, allComments) => {
        if (error) {
          console.log(error);
          req.error = error;
          return next();
        }

  
          const context = {
            Comments: allComments,
            
          };
  
        //   return res.render("", context);
        
      });
  });