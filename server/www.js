require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const https = require("https");
const http = require("http");
const passport = require("passport");
const fs = require("fs");

const { connectToMongoDB } = require("./services/mongodb");

const userRoutes = require("./routes/user-routes");
const propertyRoutes = require("./routes/property-routes");
const messageRoutes = require("./routes/email-routes");
const sitemapRoutes = require("./routes/sitemapRoute");
// Connections
connectToMongoDB();

// Express app
const app = express();

// middlewares

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use("/uploads", express.static("uploads"));
app.use(
  require("prerender-node").set("prerenderToken", "tljYnt6bZHLsojtZoBpi")
);



app.use("/sitemap.xml", sitemapRoutes);
//routes
app.use("/api/admin", userRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/email", messageRoutes);

//server
const server = http.createServer(app);

// Listen both http & https ports
const httpServer = http.createServer(app);
const httpsServer = https.createServer(
  {
    key: fs.readFileSync("/etc/letsencrypt/live/immobilierpromovilla.com-0001/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/immobilierpromovilla.com-0001/fullchain.pem"),
  },
  app
);

httpServer.listen(process.env.PORT_SERVER_HTTP, () => {
  console.log(`HTTP Server running on port ${process.env.PORT_SERVER_HTTP}`);
});

httpsServer.listen(process.env.PORT_SERVER, () => {
  console.log(`HTTPS Server running on port ${process.env.PORT_SERVER}`);
});
