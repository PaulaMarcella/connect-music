"use strict";

const { Router } = require("express");
const router = Router();

router.get("/profile", (req, res, next) => {
  res.render("userviews/profile");
});

module.exports = router;
