"use strict";

const { Router } = require("express");
const router = Router();
const Event = require("../../models/event");

router.get("/browse", (req, res, next) => {
  Event.find({})
    .sort({ creationDate: -1 })
    .then(events => {
      res.render("event/event-list", { events });
    })
    .catch(error => {
      next(error);
    });
});

router.get("/create", (req, res, next) => {
  res.render("event/create-event");
});

router.get("/edit", (req, res, next) => {
  res.render("event/add-event");
});

module.exports = router;
