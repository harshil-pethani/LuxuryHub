//Modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

//Requiring Routes
const authRoute = require("./Routes/Auth");
const userRoute = require("./Routes/UserRoute");
const productRoute = require("./Routes/ProductRoute");
const cartRoute = require("./Routes/CartRoute");
const orderRoute = require("./Routes/OrderRoute");
const userIdRoute = require("./Routes/UserIdRoute");

//Configuring Modules 
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors());

const port = process.env.PORT || 5000;

//Connecting With Database
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successful"))
    .catch((err) => console.log("Db Connection Failed " + err));


//End Points
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/getUserId", userIdRoute);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});