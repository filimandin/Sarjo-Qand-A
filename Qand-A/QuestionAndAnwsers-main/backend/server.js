const cors = require("cors");
const express = require("express");

const dotenv = require("dotenv");
dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to Sarjo's question and Answer site");
});

const appRoutes = require("./src/routes/appRoutes");

app.use("/api/", appRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
