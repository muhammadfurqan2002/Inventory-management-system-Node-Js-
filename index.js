const express = require("express");
const { connectDB } = require('./connection');
const { productRoute } = require("./routes/product");
const { userRoute } = require('./routes/user');
const { restrictToLogin, checkAuth } = require('./middlewares/authenticate');
const cookieParser = require('cookie-parser');
const app = express();

const PORT = process.env.PORT | 8080;

connectDB("mongodb://127.0.0.1:27017/Inventory")
    .then(() => {
        console.log("db-connected");
    })
    .catch((error) => {
        console.log(error);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/products', restrictToLogin, productRoute);

app.use('/', checkAuth, userRoute);

app.listen(PORT, () => {
    console.log("server started at port ", PORT);
});
