// const fs = require('fs');
const jwt = require('jsonwebtoken');

const secret = 'atory';

function jwtSign(info) {
  return jwt.sign(info, secret);
}

exports.jwtSign = jwtSign;

function jwtVerify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
}
exports.jwtVerify = jwtVerify;

/*
function jwtVerify() {
  return async function jwtverify(ctx, next) {
    const headers = ctx.headers;
    const token = headers['x-acess-token'] || ctx.cookies.get('token');
    if (!token) ctx.throw(403, '请确保已经登录');
    try {
      const jwtInfo = await _jwtVerify(token);
      const { _id, email, username, userAvatar, lastLogin } = jwtInfo;
      ctx.state.jwtInfo = { _id, email, username, userAvatar, lastLogin };
    } catch (err) {
      ctx.throw(403, '请确保已经登录');
    }
    await next();
  };
}
exports.jwtVerify = jwtVerify;
*/