import { Schema, model } from "mongoose";
import { IUser, IUserMethods, UserModel } from "./user.interface";

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["student", "admin", "faculty"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
    },
    // admin: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Admin",
    // },
  },
  {
    timestamps: true,
  },
);

const User = model<IUser, UserModel>("User", userSchema);

export default User;
