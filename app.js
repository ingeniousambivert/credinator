"use strict";

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const generatorRouter = require("./routes/generator");

const app = express();

app.use(express.static(path.join(__dirname, "client/build")));

app.use(logger("dev"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/generator", generatorRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

module.exports = app;
