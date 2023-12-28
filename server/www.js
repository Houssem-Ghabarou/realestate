require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const http = require("http");
const passport = require("passport");
const prerender = require("prerender-node");

const { connectToMongoDB } = require("./services/mongodb");

const userRoutes = require("./routes/user-routes");
const propertyRoutes = require("./routes/property-routes");
const messageRoutes = require("./routes/email-routes");

// Connections
connectToMongoDB();

// Express app
const app = express();

// middlewares
app.use(prerender);
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use("/uploads", express.static("uploads"));

prerender.set("prerenderToken", process.env.PRERENDER_TOKEN);

//routes
app.use("/api/admin", userRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/email", messageRoutes);

//server
const server = http.createServer(app);

server.listen(process.env.PORT_SERVER || 3000, () => {
  console.log(`Server running on port ${process.env.PORT_SERVER || 3000}`);
});
