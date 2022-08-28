"use-strict";

const Question = require("../models/question.model");

exports.findAll = function (req, res) {
  try {
    Question.findAll(function (err, question) {
      console.log("Question Controller");
      if (err) {
        console.log("Question Controller error");
      } else {
        console.log("Question Controller Res: ", question);
        console.log("Question Controller Res:  tetstts");
        res.send(question);
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.create = function (req, res) {
  try {
    const new_question = new Question(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      console.log("new question...");
      res.status(400).send({
        error: true,
        message: "Please provide all required field",
      });
    } else {
      Question.create(new_question, function (err, question) {
        if (err) res.send(err);
        res.json({
          error: false,
          new_question,

          message: "Question added successfully!",
        });
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.findById = function (req, res) {
  try {
    Question.findById(req.params.id, function (err, question) {
      if (err) res.send(err);
      console.log("question id");
      res.json(question);
    });
  } catch (error) {
    next(error);
  }
};

exports.update = function (req, res, next) {
  try {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(400).send({
        error: true,
        message: "Please provide all required field",
      });
    } else {
      Question.update(
        req.params.id,
        new Question(req.body),
        function (err, question) {
          if (err) res.send(err);
          res.json({
            error: false,
            message: "Question successfully updated",
          });
        }
      );
    }
  } catch (error) {
    next(error);
  }
};

exports.delete = function (req, res, next) {
  try {
    Question.delete(req.params.id, function (err, question) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: "Question successfully deleted",
      });
    });
  } catch (error) {
    next(error);
  }
};
