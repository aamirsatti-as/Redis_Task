const jwt = require('jsonwebtoken');
const moment = require('moment');
const secret = 'secret'
module.exports = ({  }) => {
  const generateToken = (jwtPayload, type = "AUTH") => {
    const payload = {
      exp: moment().add(1, "day").unix(),
      // exp: moment().add(60, "seconds").unix(),
      nbf: moment().unix(),
      typ: type,
      ...jwtPayload,
    };
    return `${jwt.sign(payload, secret)}`;
  };
  
  const getJWTToken = (payload) => ({
    token: generateToken(payload),
    // refreshToken: generateToken(payload, constants.REFRESH_TOKEN),
  });
  const authenticate = async (authorization, type = 'AUTH') => {
    const authToken = authorization && authorization.split('Bearer ')[1];
    if (!authToken) {
      throw new Error('invalid authorization header');
    }
  
    const decoded = jwt.verify(authToken, secret);
    const { nbf, exp, typ } = decoded;
  
    const time = moment().unix();
  
    if (nbf > time) {
      throw new Error('token assigned for future time');
    }
    if (exp < time) {
      throw new Error('token expired');
    }
  
    if (typ !== type) {
      throw new Error('invalid token type');
    }
    return decoded;
  };

  return {
    getJWTToken,
    authenticate
  };
};
