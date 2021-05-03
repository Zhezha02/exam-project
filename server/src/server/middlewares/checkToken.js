const JwtService = require('../services/jwtService');
const TokenError = require('../errors/TokenError');
const userQueries = require('../controllers/queries/userQueries');

module.exports.checkAuth = async (req, res, next) => {
  try {
    const {
      headers: { authorization }, // Bearer asejnvr.srgrgbd.rfgdrgb
    } = req;

    const [, token] = authorization.split(' ');
    const tokenData = await JwtService.verifyAccessToken(token);
    const foundUser = await userQueries.findUser({ id: tokenData.userId });
    delete foundUser.password;
    res.send(foundUser);
  } catch (err) {
    next(new TokenError(err));
  }
};
