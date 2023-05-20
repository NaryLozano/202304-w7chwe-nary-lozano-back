import { Schema, model, Types } from "mongoose";
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 5,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  interest: {
    type: String,
    required: true,
  },
  friends: [Types.ObjectId],
  enemies: [Types.ObjectId],
});

const User = model("User ", userSchema, "users");

export default User;
