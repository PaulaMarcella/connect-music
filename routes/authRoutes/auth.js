"use strict";

const { Router } = require("express");
const router = Router();
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

//GET ROUTES
router.get("/signup", (req, res, next) => {
  res.render("authviews/sign-up");
});

router.get("/login", (req, res, next) => {
  res.render("authviews/log-in");
});

//POST ROUTES

router.post(
  "/signup",
  passport.authenticate("signup-strategy", {
    successRedirect: "/",
    failureRedirect: "/auth/sign-up"
  })
);

router.post(
  "/login",
  passport.authenticate("login-strategy", {
    successRedirect: "/",
    failureRedirect: "/auth/login"
  })
);

router.post("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
