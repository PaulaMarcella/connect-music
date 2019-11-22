"use strict";

const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;

passport.serializeUser((user, callback) => {
  //..
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => {
      callback(null, user);
    })
    .catch(error => {
      callback(error);
    });
});

passport.use(
  "signup-strategy",
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    (req, email, password, callback) => {
      bcrypt
        .hash(password, 10)
        .then(hash => {
          return User.create({
            email,
            passwordHash: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname
          });
        })
        .then(user => {
          //..
          callback(null, user);
        })
        .catch(error => {
          //..
          callback(error);
        });
    }
  )
);

passport.use(
  "login-strategy",
  new LocalStrategy({ usernameField: "email" }, (email, password, callback) => {
    let auxUser;
    return User.findOne({
      email
    })
      .then(result => {
        auxUser = result;
        return bcrypt.compare(password, auxUser.passwordHash);
      })
      .then(passwordMatchesHash => {
        if (passwordMatchesHash) {
          callback(null, auxUser);
        } else {
          callback(new Error("Passwords dont match"));
        }
      })
      .catch(error => {
        callback(error);
      });
  })
);

passport.use(
  new SpotifyStrategy(
    "spotify",
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.SPOTIFY_URL,
      scope: ["user: email", "user-read-private"],
      showDialog: true
    },
    (accessToken, refreshToken, expires_in, profile, callback) => {
      //   const { disyplayName: name, photos, emails } = profile;
      //   const { photos: [{ value: photo } = {}] = [] } = profile;

      User.findOne({ spotifyId: profile.id })
        .then(user => {
          if (user) {
            callback(null, user); // To login the user
          } else {
            User.create({
              firstname: profile.displayName,
              email: profile.email,
              firstname: profile.firstname,
              accessToken,
              refreshToken
            }).then(newUser => {
              callback(null, newUser); // To login newUser
            });
          }
        })
        .catch(err => callback(err));
    }
  )
);
