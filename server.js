const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());



app.get("/", function (req, res) {
  res.send("Hello! Welcome to My Hotel");
});

// import the person routes
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuItemRoutes');

// use the routes for person
app.use('/person',personRoutes);

// use the routes for menu item
app.use('/menu_Item',menuRoutes);

app.listen(3000, () => console.log("server is listing in port 3000"));
