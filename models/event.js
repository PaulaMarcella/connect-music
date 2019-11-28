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
      default:
        "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
    },
    date: {
      type: String
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
