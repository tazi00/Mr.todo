const jwt = require("jsonwebtoken");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
require("dotenv").config();
const {
  getUserByEmail,
  createUser,
  getUserByUserName,
} = require("../services/users.services");

class AuthController {
  static generateAccessToken(userId, email, username) {
    return jwt.sign(
      { userId, email, username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
  }

  static generateRefreshToken(userId, email, username) {
    return jwt.sign(
      { userId, email, username },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );
  }

  static async authLogin(req, res) {
    const { emailOrUsername, password } = req.body;

    try {
      // Check if the input is an email or username
      const isEmail = emailOrUsername.includes("@");

      if (!isEmail && emailOrUsername.includes(" ")) {
        return res
          .status(400)
          .json({ message: "Username should not contain spaces" });
      }

      const user = isEmail
        ? await getUserByEmail(emailOrUsername)
        : await getUserByUserName(emailOrUsername);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const { id, email, username } = user;
      const accessToken = AuthController.generateAccessToken(
        id,
        email,
        username
      );
      const refreshToken = AuthController.generateRefreshToken(id);

      // Save the refresh token to the database or another secure storage mechanism
      // This is necessary for revoking refresh tokens if needed

      res.json({ accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async authRegister(req, res) {
    const { email, password, username } = req.body;

    try {
      // Validate input
      if (!email || !password || !username) {
        return res
          .status(400)
          .json({ message: "Email, password, and username are required" });
      }

      // Validate email format
      if (!emailValidator.validate(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      // Check if the user with the given email already exists
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }

      // Check if the username contains spaces
      if (username.includes(" ")) {
        return res
          .status(400)
          .json({ message: "Username should not contain spaces" });
      }

      // Validate password length
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters long" });
      }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Set default values for other fields
      const defaultValues = {
        firstname: "",
        lastname: "",
        img: "",
        bio: "",
        phonenumber: "",
        hobby: "",
      };

      // Combine default values with user-provided values
      const newUser = await createUser({
        ...defaultValues,
        email,
        password: hashedPassword,
        username,
      });

      const { id, email: userEmail, username: userUsername } = newUser;
      const accessToken = AuthController.generateAccessToken(
        id,
        userEmail,
        userUsername
      );
      const refreshToken = AuthController.generateRefreshToken(id);

      // Save the refresh token to the database or another secure storage mechanism
      // This is necessary for revoking refresh tokens if needed

      res.status(201).json({ accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static authLogout(req, res) {
    // Log out logic (if needed)
    res.json({ message: "Logout successful" });
  }
}

module.exports = AuthController;
