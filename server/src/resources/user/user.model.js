const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshTokenHash: {
    type: String,
    default: null,
  },
  refreshTokenExpiresAt: {
    type: Date,
    default: null,
  },
});

export const User = mongoose.model("user", userSchema);
