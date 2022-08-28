const jwt = require("jsonwebtoken");
const adminAuth = async (req, res, next) => {
  console.log("req", req.headers);
  try {
    if (req.headers?.authorization) {
      const token = req.headers?.authorization?.split(" ")[1];
      console.log("token ", token);

      let decodedData;

      if (token) {
        decodedData = jwt.verify(token, process.env.jwt_secret);
        // if(!decodedData){
        //  return res.json('you are not authorize to access this route')
        // }
        console.log("this decoded data", decodedData);
        console.log("this decoded data usrtype", decodedData.user.user_type);

        // if (decodedData) {
        // }

        if (decodedData?.user?.user_type !== "ADMIN")
          return res
            .status(401)
            .json("You are not authorize to access this route");
        req.id = decodedData?.id;
      }
    } else {
      console.log("you are unathorize");
      res.status(401).json("you need to login to access this route");
    }
    next();
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = adminAuth;
