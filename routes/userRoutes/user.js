"use strict";

const { Router } = require("express");
const router = Router();
const User = require("../../models/user");

//GET ROUTES
router.get("/profile", (req, res, next) => {
  res.render("userviews/profile");
});

router.get("/profile/edit", (req, res, next) => {
  res.render("userviews/edit-profile");
});

// POST ROUTES
router.post("/profile/edit", (req, res, next) => {
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
});

module.exports = router;
