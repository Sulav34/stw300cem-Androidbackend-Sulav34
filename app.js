const mongoose = require("mongoose"); //third party --for connecting
const express = require("express"); //third party
const bodyParser = require("body-parser"); //core module
const env = require("dotenv");
const cors = require("cors");

const GlobalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
// const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productsRoute");
const productImageUpload = require("./routes/productUploadRoute");
const categoryRoute = require("./routes/categoryRoute");


env.config();

const db = require("./database/db");
const customer_route = require("./routes/customer_route");
const product_route = require("./routes/productsRoute");
const cart_route = require("./routes/cart_route");
const connectDB = require("./database/db");

const app = express();
app.use(cors());
connectDB();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(customer_route);
app.use(productRoute);
app.use(cart_route);


app.use("/api/product", productRoute);
// app.use("/api/multipleuploads", productImageUpload);
app.use("/api/category", categoryRoute);

// to see static files
// http:localhost:5000/img/users/${filename}
// OR http:localhost:5000/img/products/${filename}
app.use(express.static("files"));

// Global error handling Middleware
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(GlobalErrorHandler);

const port = 90;
app.listen(port, () => {
  console.log(`Server is running in ${port}`);
});
