var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

const authRouter = require("./app/auth/router");
const categoryRouter = require("./app/category/router");
const cartRouter = require("./app/cart/router");
const deliveryRouter = require("./app/delivery-address/router");
const invoiceRouter = require("./app/invoice/router");
const orderRouter = require("./app/order/router");
const productRouter = require("./app/product/router");
const tagRouter = require("./app/tag/router");
const wilayahRouter = require("./app/wilayah/router");

const { decodeToken } = require("./app/auth/middleware");

// const mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/foodstore", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// });
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(decodeToken());

app.use("/auth", authRouter);
app.use("/api", categoryRouter);
app.use("/api", cartRouter);
app.use("/api", deliveryRouter);
app.use("/api", invoiceRouter);
app.use("/api", orderRouter);
app.use("/api", productRouter);
app.use("/api", tagRouter);
app.use("/api", wilayahRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
