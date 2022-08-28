const jwt = require("jsonwebtoken");
const Auth = async (req, res, next) => {
  console.log("req froma auth", req.headers);
  //   check if there is any token in the request header

  try {
    console.log("req.headers?.authorization", req.headers?.authorization);
    if (req.headers?.authorization) {
      console.log("herrrrrr");
      const token = req.headers?.authorization?.split(" ")[1];
      console.log("token  my token", token);
      //    checking the token from from header.

      if (token) {
        //  verify the given token
        jwt.verify(token, process.env.jwt_secret);
      }
    } else {
      console.log("you need");
      res.status(401).json("you need to login to access this route");
    }
    next();
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

module.exports = Auth;
