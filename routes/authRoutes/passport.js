"use strict";

const { Router } = require("express");
const router = Router();
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

//GET ROUTES
// router.get("/spotify", passport.authenticate("spotify"));

router.get(
  "/spotify",
  passport.authenticate("spotify", {
    scope: ["user-read-email", "user-read-private"]
  }),
  (req, res, next) => {
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  }
);

router.get(
  "/spotify/callback",
  passport.authenticate("spotify", { failureRedirect: "/auth/login" }),
  (req, res, next) => {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

//POST ROUTES

module.exports = router;
