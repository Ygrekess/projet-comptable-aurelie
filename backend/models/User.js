import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  lastname: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  firstname: {
    type: String,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  phone: {
    type: String,
    max: 10,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model("users", userSchema);
export default userModel;
