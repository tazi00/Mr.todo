const express = require("express");
const bodyParser = require("body-parser");
const { getFileData } = require("./utils/generic");
const notfound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/errorhandler");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const authenticateToken = require("./middlewares/authenticateToken");
const app = express();

const endpoint = "/api/v1";
// Middleware
app.use(bodyParser.json());

// Routes
// app.use("/users", userRoutes);
// app.use("/todos", todoRoutes);
// app.use("/comments", commentRoutes);
// app.use("/likes", likeRoutes);

// Default route
app.get("/", async (req, res) => {
  try {
    const usersData = await getFileData("users");
    res.status(200).json({ msg: "Users Data:", data: usersData });

    // Now you can use the usersData in the rest of your code
  } catch (error) {
    res.status(200).json({ msg: "Users Data: not retrives" });
  }
});

app.use(`${endpoint}/auth`, authRouter);
app.use(`${endpoint}/user`, authenticateToken, userRouter);
app.use(notfound);
app.use(errorHandler);

module.exports = app;
