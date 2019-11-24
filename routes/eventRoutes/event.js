"use strict";

const { Router } = require("express");
const router = Router();
const Event = require("../../models/event");

//-------cloudinary configurations--------

const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: "/gig-connect",
  allowedFormats: ["jpg", "png"]
});
const upload = multer({ storage });

//----------------------------------------

//POST ROUTES

router.get("/browse", (req, res, next) => {
  Event.find({})
    .sort({ creationDate: -1 })
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
  const date = req.body.date;
  const creator = req.user._id;

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
      res.redirect("/event/detail/" + event._id);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
