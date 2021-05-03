const authRouter = require('express').Router();
const AuthController = require('../controllers/authController');
const { checkRefreshToken } = require('../middlewares/tokenMw');
const Validators = require('../middlewares/validators');

authRouter.post('/sign-in', Validators.validateLogin, AuthController.signIn);
authRouter.post(
  '/sign-up',
  Validators.validateRegistrationData,
  AuthController.signUp
);
authRouter.post('/refresh', checkRefreshToken, AuthController.refresh);

module.exports = authRouter;
