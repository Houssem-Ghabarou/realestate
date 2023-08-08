const mongoose = require("mongoose");

const connectToMongoDB = () => {
  console.log("connecting");
  const uri = process.env.MONGODB_URI;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connect(uri, options);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
};

module.exports = { connectToMongoDB };
