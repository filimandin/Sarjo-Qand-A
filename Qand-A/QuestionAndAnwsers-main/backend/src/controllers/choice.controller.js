"use-strict";

const dbConn = require("../../config/db.config");
const Choice = require("../models/choice.model");

exports.findAll = function (req, res, next) {
  try {
    Choice.findAll(function (err, choice) {
      console.log("Choice Controller");
      if (err) {
        console.log("Choice Controller error");
      } else {
        res.send(choice);
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.create = function (req, res, next) {
  try {
    const new_choice = new Choice(req.body);
    //handles null error

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(400).send({
        error: true,
        message: "Please provide all required field",
      });
    } else {
      Choice.create(new_choice, function (err, choice) {
        if (err) res.send(err);
        res.json({
          error: false,
          message: "Choice added successfully!",
          data: choice,
        });
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.findById = function (req, res) {
  try {
    Choice.findById(req.params.id, function (err, choice) {
      if (err) res.send(err);
      res.json(choice);
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = function (req, res, next) {
  try {
    Choice.delete(req.params.id, function (err, choice) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: "Choice successfully deleted",
      });
    });
  } catch (error) {
    next(error);
  }
};

exports.updateChoice = (req, res, next) => {
  try {
    if (req.method == "PUT") {
      let query = "";
      if (req.body.name && req.body.is_correct) {
        query = `name = '${req.body.name}',  is_correct ='${req.body.is_correct}'`;
      } else if (req.body.name && req.body.is_correct == "") {
        query = `name =
          '${req.body.name}'`;
      } else if (req.body.is_correct && req.body.name == "") {
        query = `is_correct =
         '${req.body.is_correct}'`;
      }
      let queryDetails = `UPDATE choices SET ${query} WHERE id = ${req.params.id}`;

      dbConn.query(queryDetails, function (err, result) {
        if (!err) {
          console.log("query details", queryDetails);
          res.status(200).json({ message: "User infos updated." });
        } else {
          res.status(401).json({ message: "Error when updating user infos." });
        }
      });
    }
  } catch (error) {
    console.log("error trying to update", error);
    next(error);
  }
};
