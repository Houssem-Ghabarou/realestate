const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  namesurname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: { type: String, enum: ["unread", "read"], default: "unread" },
  property: { type: mongoose.Schema.Types.ObjectId, ref: "RealEstateProperty" }, // Reference to the Property model
  timestamp: { type: Date, default: Date.now },
});

const Email = mongoose.model("email", emailSchema);

module.exports = Email;
