const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "ADMIN",
    required: true,
  },
});

// userSchema.pre("save", async function (next) {
//   const user = this;

//   if (user.isModified("password")) {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(user.password, salt);
//     user.password = hashedPassword;
//   }

//   next();
// });

const User = mongoose.model("user", userSchema);

module.exports = User;
