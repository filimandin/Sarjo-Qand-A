"use strict";
var dbConn = require("./../../config/db.config");

// Create Question
var Question = function (question) {
  this.question = question.question;
};

Question.create = function (newQue, result) {
  dbConn.query("INSERT INTO questions set ?", newQue, function (err, res) {
    if (err) {
      console.log("Error In Creating Question", err);
      result(err, null);
    } else {
      console.log("Question ID: ", res.insertId);
      result(null, result.insertId);
    }
  });
};

Question.findById = function (id, result) {
  dbConn.query(
    "Select * from questions where id = ? ",
    id,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};
Question.findAll = function (result) {
  dbConn.query("Select * from questions", function (err, res) {
    if (err) {
      console.log("error in questions: ", err);
      result(null, err);
    } else {
      console.log("questions : ", res);
      result(null, res);
    }
  });
};

Question.update = function (id, question, result) {
  console.log("question and id", id, "and", question.question);
  let query = question.question;

  const data = `UPDATE questions SET question='${query}'
  WHERE id= ${id}`;
  dbConn.query(data, function (err, res) {
    if (err) {
      console.log("Update error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Question.delete = function (id, result) {
  dbConn.query("DELETE FROM questions WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
module.exports = Question;
