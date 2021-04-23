"use strict";

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes");
const generatorRouter = require("./routes/generator");

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/generator", generatorRouter);

module.exports = app;
