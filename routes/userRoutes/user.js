"use strict";

const { Router } = require("express");
const router = Router();
const User = require("../../models/user");
const ensureLogin = require("connect-ensure-login");
const upload = require("../../middleware/upload");

//GET ROUTES
router.get(
  "/profile",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    res.render("userviews/profile");
  }
);

router.get(
  "/profile/edit",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    res.render("userviews/edit-profile");
  }
);

// POST ROUTES

router.post("/profile/image", upload.single("file"), (req, res, next) => {
  const userId = req.user;
  User.findByIdAndUpdate(userId, { imageURL: req.file.url })
    .then(updatedUser => {
      console.log(req.file);
      console.log(updatedUser);
      res.redirect("/user/profile");
    })
    .catch(error => {
      console.log("Could not update profile image", error);
    });
});

router.post(
  "/profile/edit",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    const { firstname, lastname, email, userDescription } = req.body;
    User.findOneAndUpdate(
      { _id: req.user },
      { firstname, lastname, email, userDescription }
    )
      .then(updatedUser => {
        console.log(updatedUser);
        res.redirect("/user/profile");
      })
      .catch(err => {
        next(err);
      });
  }
);

module.exports = router;
