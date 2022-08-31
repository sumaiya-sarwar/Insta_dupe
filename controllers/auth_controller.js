const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models");



router.get("/signup", function (req, res) {
    return res.render("/signup");
  });

  router.get("/home", function (req, res) {
    res.render("/home");
  });

//signup
  router.post("/signup", async function (req, res) {
    try {
    
      const foundUser = await User.exists({ username: req.body.username });

      if (foundUser) {
        return res.redirect("/home");
      }
  
  
      const salt = await bcrypt.genSalt(10);
      
      const hash = await bcrypt.hash(req.body.password, salt);
  
      req.body.password = hash;
  
  
      const newUser = await User.create(req.body);
  
      return res.redirect("/home");
    } catch (err) {
      console.log(err);
      return res.send(err);
    }
  });

//login
router.post("/login", async function (req, res) {
    try {
     
      const foundUser = await User.findOne({ username: req.body.username });
      console.log(foundUser);
   
      if (!foundUser) return res.redirect("/signup");
  
      
      const match = await bcrypt.compare(req.body.password, foundUser.password);
  

      if (!match) return res.send("password invalid");

      req.session.currentUser = {
        id: foundUser._id,
        username: foundUser.username,
      };
  
      return res.redirect(`${foundUser._id}/profile`);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  });

  //logout
  router.get("/logout", async function (req, res) {
    try {
      await req.session.destroy();
      return res.redirect("/home");
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  });

module.exports = router;