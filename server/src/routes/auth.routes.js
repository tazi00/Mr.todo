const express = require("express");
const AuthController = require("../controllers/auth.controller");
const authRouter = express.Router();

authRouter.route("/login").post(AuthController.authLogin);
authRouter.route("/register").post(AuthController.authRegister);
authRouter.route("/logout").post(AuthController.authLogout);

module.exports = authRouter;
