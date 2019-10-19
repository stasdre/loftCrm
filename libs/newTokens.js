const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Token = mongoose.model("Token");

const newTokens = payload => {
  return new Promise((resolve, reject) => {
    Token.deleteMany({ user: payload.id })
      .then(() => {
        const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          expiresIn: process.env.TOKEN_EXP
        });
        const refreshToken = jwt.sign(
          payload,
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: process.env.REFRESH_TOKEN_EXP
          }
        );

        const newToken = new Token({
          accessToken,
          refreshToken,
          user: payload.id
        });

        newToken
          .save()
          .then(() => {
            return resolve({
              accessToken,
              refreshToken,
              accessTokenExpiredAt: Date.now() + +process.env.TOKEN_EXP,
              refreshTokenExpiredAt: Date.now() + +process.env.REFRESH_TOKEN_EXP
            });
          })
          .catch(e => reject(e));
      })
      .catch(e => reject(e));
  });
};

module.exports = newTokens;
