"use strict";

const LocalStrategy = require("passport-local").Strategy;
const SpotifyStrategy = require("passport-spotify").Strategy;
const User = require("./models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

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
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, callback) => {
      let auxUser;
      return User.findOne({
        email
      })
        .then(result => {
          if (!result) {
            callback(null, false, { message: "Incorrect email" });
          } else {
            console.log("FOUND USER", result);
            auxUser = result;
            return bcrypt.compare(password, auxUser.passwordHash);
          }
        })
        .then(passwordMatchesHash => {
          if (passwordMatchesHash) {
            callback(null, auxUser);
          } else {
            callback(new Error("Sorry, Passwords does not match"));
          }
        })
        .catch(error => {
          callback(error);
        });
    }
  )
);

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.SPOTIFY_URL,
      scope: ["user-read-email", "user-read-private"],
      showDialog: true
    },
    (accessToken, refreshToken, expires_in, profile, callback) => {
      console.log("Profile before find one", profile);

      User.findOne({ spotifyId: profile._json.id })
        .then(user => {
          if (user) {
            console.log("THE FOUND USER", user);
            callback(null, user); // To login the user
          } else {
            User.create({
              email: profile._json.email,
              firstname: profile._json.username,
              accessToken,
              refreshToken,
              spotifyId: profile._json.id
            }).then(newUser => {
              callback(null, newUser); // To login newUser
            });
          }
        })
        .catch(err => callback(err));
    }
  )
);
