const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_TOKEN, (err, data) => {
      if (err)
        return res.status(402).json({ message: "The token is not valid" });
      else req.user = data;
      next();
    });
  } else {
    return res.status(403).json({ message: "You are not authenticated" });
  }
};

const verifyAndAuthorization = (req, res, next) => {
  verify(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res
        .status(403)
        .json({ message: "You are not allowed to perform that operation" });
    }
  });
};

module.exports = { verify, verifyAndAuthorization };
