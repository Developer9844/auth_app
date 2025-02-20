const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Home Route (Login Page)
app.get("/", (req, res) => {
    res.render("home");
});

// Register Page
app.get("/register", (req, res) => {
    res.render("register");
});

// Posts Page (After Login)
app.get("/posts", (req, res) => {
    res.render("posts");
});

// Profile Settings Page
app.get("/profile", (req, res) => {
    res.render("profile");
});

app.listen(PORT, () => {
    console.log(`Frontend running at http://localhost:${PORT}`);
});
