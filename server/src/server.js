require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
