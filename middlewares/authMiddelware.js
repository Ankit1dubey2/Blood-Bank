const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "No authorization header provided",
      });
    }

    const token = authHeader.split(" ")[1];
    
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Token format is incorrect",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        return res.status(401).send({
          success: false,
          message: "Auth Failed",
        });
      } else {
        req.body.userId = decode.userId;
        next();
      }
    });
  } catch (error) {
    console.log("Auth Middleware Error:", error);
    return res.status(401).send({
      success: false,
      message: "Auth Failed",
      error,
    });
  }
};
