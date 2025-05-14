import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

// Required for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Home route
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://api.adviceslip.com/advice");
    const advice = response.data.slip.advice;
    res.render("index", { advice });
  } catch (err) {
    res.render("index", { advice: "Oops! Couldn't fetch advice." });
  }
});

// Refresh advice on form submit
app.post("/", async (req, res) => {
  try {
    const response = await axios.get("https://api.adviceslip.com/advice");
    const advice = response.data.slip.advice;
    res.render("index", { advice });
  } catch (err) {
    res.render("index", { advice: "Oops! Something went wrong." });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
