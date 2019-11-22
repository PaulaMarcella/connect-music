"use strict";

const { Router } = require("express");
const router = Router();

router.get("/", (req, res, next) => {
  res.render("index", { title: "Gig Connect!" });
});

module.exports = router;
