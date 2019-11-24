"use strict";

const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

//GET ROUTES
router.get("/signup", (req, res, next) => {
  res.render("authviews/sign-up");
});

router.get("/login", (req, res, next) => {
  res.render("authviews/log-in");
});

// router.get(
//   "/spotify",
//   passport.authenticate("spotify", {
//     scope: ["user-read-email", "user-read-private"]
//   }),
//   (req, res, next) => {
//     // The request will be redirected to spotify for authentication, so this
//     // function will not be called.
//   }
// );

//POST ROUTES

router.post(
  "/signup",
  passport.authenticate("signup-strategy", {
    successRedirect: "/user/profile",
    failureRedirect: "/auth/sign-up"
  })
);

router.post(
  "/login",
  passport.authenticate("login-strategy", {
    successRedirect: "/user/profile",
    failureRedirect: "/auth/login"
  })
);

router.post("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

// router.get(
//   "/spotify",
//   passport.authenticate("spotify", {
//     scope: ["user-read-email", "user-read-private"]
//   }),
//   (req, res, next) => {
//     // The request will be redirected to spotify for authentication, so this
//     // function will not be called.
//   }
// );

router.get(
  "/spotify",
  passport.authenticate("spotify", {
    scope: ["user-read-email", "user-read-private"],
    showDialog: true
  }),
  (req, res) => {
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  }
);

router.get(
  "/spotify/callback",
  passport.authenticate("spotify", {
    showDialog: true,
    failureRedirect: "/auth/login"
  }),
  (req, res, next) => {
    // Successful authentication, redirect home.
    res.redirect("/user/profile");
  }
);

module.exports = router;
