const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models");

// express.json() and express.urlencoded is needed for POST and PUT requests to take in data payloads.
// built in method to recognize incoming request object as a JSON object
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("", (req, res) => {
  res.redirect("/home");
})

router.get("/home", function (req, res) {
  res.render("home.ejs");
});

router.get("/signup", function (req, res) {
  return res.render("signup.ejs");
});

//login
router.post("/home", async function (req, res, next) {
  try {

    const foundUser = await User.findOne({ username: req.body.username });

    console.log('user', foundUser);

    if (!foundUser) {
      console.log(foundUser, 'user')
      return res.redirect('/home');
    } else {
      const match = await bcrypt.compare(req.body.password, foundUser.password);
      if (!match) return res.send("password invalid");
      req.session.currentUser = {
        id: foundUser._id,
        username: foundUser.username,
      };
    }
    return res.redirect(`user/${foundUser._id}/profile`);
  } catch (err) {
    console.log(err);
    res.send(err);
    next()
  }
});


//signup
router.post("/signup", async function (req, res, next) {
  try {

    console.log("sign up")
    const foundUser = await User.exists({ username: req.body.username });

    if (foundUser) {
      console.log(foundUser._id)
      res.redirect('/login')
    }
    else {
      const salt = await bcrypt.genSalt(10);

      const hash = await bcrypt.hash(req.body.password, salt);

      req.body.password = hash;


      const newUser = await User.create(req.body);
      // console.log(newUser)
      console.log(newUser._id)
      return res.redirect(`/home`);
    }

  } catch (err) {
    console.log(err);
    return res.send(err);
    next()
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