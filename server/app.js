"use strict";

const express = require("express");
const logger = require("morgan");

const indexRouter = require("./routes");
const generatorRouter = require("./routes/generator");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/generator", generatorRouter);

module.exports = app;