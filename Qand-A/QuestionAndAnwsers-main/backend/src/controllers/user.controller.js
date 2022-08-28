const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const dbConn = require("../../config/db.config");
const jwt = require("jsonwebtoken");
exports.create = function (req, res) {
  console.log("User: tess", req.body);
  const new_user = new User(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({
      error: true,
      message: "Please provide all required field",
    });
  } else {
    User.create(new_user, function (err, user) {
      console.log("user data tester", user);
      if (err) res.send(err);
      res.json({
        error: false,
        data: user,
        message: "User added successfully!",
      });
    });
  }
};

exports.login = async (request, response) => {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;

  // Ensure the input fields exists and are not empty
  if (username && password) {
    console.log("usernamee", username);
    // Execute SQL query that'll select the account from the database based on the specified username and password
    dbConn.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
      async function (error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {

          const userResponse = results[0];

          const token = await jwt.sign(
            {
              user: { id: userResponse.id, user_type: userResponse.user_type },
            },
            process.env.jwt_secret,
            { expiresIn: "1d" }
          );

          const data = {
            data: {
              username: userResponse.username,
              name: userResponse.first_name + userResponse.last_name,
              id: userResponse.id,
              userType: userResponse.user_type,
            },

            token: token,
          };

          response.send(data);
        } else {
          response.send("Incorrect Username and/or Password!");
        }

        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
};
