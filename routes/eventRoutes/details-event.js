"use strict";

const { Router } = require("express");
const router = Router();
const Event = require("../../models/event");

//GET ROUTES

router.get("/edit", (req, res, next) => {
  res.render("event/edit-event");
});

router.get("/detail/:eventId", (req, res, next) => {
  const id = req.params.eventId;
  Event.findById(id)
    .then(event => {
      console.log(event);
      res.render("event/detail-event", { event });
    })
    .catch(error => {
      throw new Error("This event could not be found.", error);
    });
});

module.exports = router;
