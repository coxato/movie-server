const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const useRoutes = require("./routes/index");
// app
const app = express();
// middlewares
app.use(express.json({}));
app.use(express.urlencoded({ extended: true}));
app.use(cors());
app.use(morgan('dev'));
// routes
useRoutes(app);

exports.app = app;