"use strict";
var dbConn = require("./../../config/db.config");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Create User
var User = function (user) {
  this.username = user.username;
  this.password = user.password;
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.user_type = user.user_type;
};
User.create = function (newUser, result) {
  dbConn.query("INSERT INTO users set ?", newUser, function (err, res) {
    if (err) {
      console.log("Error In Creating User", err);
      result(err, null);
    } else {
      console.log("User ID: ", res.insertId);
      result(null, result.insertId);
    }
  });
};

module.exports = User;
