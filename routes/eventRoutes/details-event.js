"use strict";

const { Router } = require("express");
const router = Router();
const Event = require("../../models/event");

//GET ROUTES

router.get("/detail/:eventId", (req, res, next) => {
  const id = req.params.eventId;
  let state = false;
  Event.findById(id)
    .populate("creator")
    .then(event => {
      if (event.creator._id == req.user.id) {
        state = true;
      } else {
        state = false;
      }
      res.render("event/detail-event", { event, state });
    })
    .catch(error => {
      throw new Error("This event could not be found.", error);
    });
});

router.get("/edit/:eventId", (req, res, next) => {
  const id = req.params.eventId;
  Event.findById(id)
    .populate("creator")
    .then(event => {
      console.log(event);
      res.render("event/edit-event", { event });
    })
    .catch(error => {
      throw new Error("This event could not be found.", error);
    });
});
router.post("/edit/:eventId", (req, res, next) => {
  const id = req.params.eventId;
  const {
    eventName,
    description,
    artists,
    genre,
    city,
    ticketURL,
    date
  } = req.body;
  Event.findOneAndUpdate(
    { _id: id },
    {
      eventName,
      description,
      artists,
      genre,
      city,
      ticketURL,
      date
    }
  )
    .then(event => {
      console.log(event);
      res.redirect(`/event/detail/${event._id}`);
    })
    .catch(error => {
      throw new Error("This event could not be found.", error);
    });
});

router.post("/delete/:eventId", (req, res, next) => {
  const id = req.params.eventId;
  Event.findByIdAndDelete(id)
    .then(() => {
      console.log("Successfully deleted event");
      res.redirect("/event/browse");
    })
    .catch(error => {
      throw new Error("Event found not be deleted", error);
    });
});

module.exports = router;
