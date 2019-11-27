"use strict";

const { Router } = require("express");
const router = Router();
const Event = require("../../models/event");

//-------cloudinary configurations--------
const upload = require("../../middleware/upload");

//-------Protect Routes with this: --------
// const ensureLogin = require("connect-ensure-login");
// ensureLogin.ensureLoggedIn("/auth/login"),

//GET ROUTES

router.get("/browse", (req, res, next) => {
  Event.find({})
    .sort({ created_at: -1 })
    .then(events => {
      res.render("event/list-event", { events });
    })
    .catch(error => {
      next(error);
    });
});

router.get("/create", (req, res, next) => {
  res.render("event/create-event");
});

//POST

router.post("/create", upload.single("file"), (req, res, next) => {
  const eventName = req.body.event.toLowerCase();
  const description = req.body.description.toLowerCase();
  const artistArray = req.body.artists.toLowerCase().split(",");
  const onegenre = req.body.genre.toLowerCase().split(",");
  const city = req.body.city.toLowerCase();
  const ticketURL = req.body.ticket;
  const imageURL = req.file && req.file.url;
  const date = req.body.date.toString().substr(0, 10);
  const creator = req.user._id;
  console.log("the date as a string: ", date);

  Event.create({
    eventName,
    description,
    artists: artistArray,
    genre: onegenre,
    city,
    ticketURL,
    imageURL,
    date,
    creator
  })
    .then(event => {
      console.log(event);
      //res.render('event/eventPage', {event});
      //res.redirect("/event/detail/" + event._id);
      res.redirect("/");
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
