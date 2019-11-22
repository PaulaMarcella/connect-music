"use strict";

const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true
      // required: true
    },
    lastname: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true
    },
    passwordHash: {
      type: String,
      trim: true
    },
    imageURL: {
      type: String,
      default: "../images/default-user-icon-4.jpg"
    },
    userDescription: {
      type: String,
      default: "User Description here"
    },
    eventsWatching: [
      {
        type: ObjectId,
        default: "",
        ref: "Event"
      }
    ],
    eventsAttending: [
      {
        type: ObjectId,
        default: "",
        ref: "Event"
      }
    ],
    accessToken: String,
    refreshToken: String,
    spotifyId: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("User", schema);
