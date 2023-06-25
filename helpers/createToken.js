const jwt = require("jsonwebtoken");

const createToken = {
  refresh: (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: "10m" });
  },
  access: (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "15m" });
  },
};

module.exports = createToken;
