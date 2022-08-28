"use strict";
var dbConn = require("./../../config/db.config");

// Create Choice
var Choice = function (choice) {
  this.question_id = choice.question_id;
  this.name = choice.name;
  this.is_correct = choice.is_correct;
};

Choice.create = function (newCh, result) {
  dbConn.query("INSERT INTO choices set ?", newCh, function (err, res) {
    if (err) {
      console.log("Error In Creating Choice", err);
      result(err, null);
    } else {
      console.log("Choice ID: ", res.insertId);
      result(null, result.insertId);
    }
  });
};

Choice.findById = function (id, result) {
  dbConn.query("Select * from choices where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
Choice.findAll = function (result) {
  dbConn.query("Select * from choices", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      // console.log("choices : ", res);
      result(null, res);
    }
  });
};

Choice.delete = function (id, result) {
  dbConn.query("DELETE FROM choices WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
module.exports = Choice;
