const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const choiceController = require("../controllers/choice.controller");
const questionController = require("../controllers/question.controller");
const Auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

// Auth routes
router.post("/register", userController.create);

router.post("/login", userController.login);

// Question Routes

router.get("/questions", Auth, questionController.findAll);

// Create a new question
router.post("/questions/create", adminAuth, questionController.create);

// Retrieve a single question with id
router.get("/questions/:id", Auth, questionController.findById);

// Update a question with id
router.put("/questions/:id", adminAuth, questionController.update);

// Delete a question with id
router.delete("/questions/:id", adminAuth, questionController.delete);

// Choice Routes
// Retrieve all choice
router.get("/choices", Auth, choiceController.findAll);

// Create a new choice
router.post("/choices/create", adminAuth, choiceController.create);

// Retrieve a single choice with id
router.get("/choices/:id", choiceController.findById);

// Update a choice with id
router.put("/choices/:id", adminAuth, choiceController.updateChoice);

// Delete a choice with id
router.delete("/choices/:id", adminAuth, choiceController.delete);

module.exports = router;
