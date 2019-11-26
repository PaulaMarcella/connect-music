"use strict";

const { Router } = require("express");
const router = Router();

router.get("/profile", (req, res, next) => {
  res.render("userviews/profile");
});

router.get("/profile/edit", (req, res, next) => {
  res.render("userviews/edit-profile");
});

module.exports = router;
