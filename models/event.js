"use strict";

const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true
    },
    artists: [{ type: String }],
    description: {
      type: String,
      required: true,
      default: "Add a describtion to this Event"
    },
    genre: [{ type: String }],
    city: {
      type: String,
      required: true
    },
    ticketURL: {
      type: String,
      trim: true
    },
    imageURL: {
      type: String,
      default: "../images/default-image.jpg"
    },
    date: {
      type: Date
    },
    creator: {
      type: ObjectId,
      ref: "User"
    },
    comments: [
      {
        commentBody: String,
        commentTitle: String,
        commentAuthor: { type: ObjectId, ref: "User" }
      }
    ]
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Event", eventSchema);
