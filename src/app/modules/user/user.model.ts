import { Schema, model } from "mongoose";
import { IUser, IUserMethods, UserModel } from "./user.interface";
import bcrypt from "bcryptjs";
import config from "../../../config";

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
      select: 0,
    },
    needChangePassword: {
      type: Boolean,
      default: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
  },
);

// use instance method to check user exist or not
userSchema.methods.isUserExist = async function (
  id: string,
): Promise<Pick<
  IUser,
  "id" | "password" | "role" | "needChangePassword"
> | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needChangePassword: 1 },
  );
};

// use instance method to check user login password is right or not
userSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre("save", async function (next) {
  // hashing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

const User = model<IUser, UserModel>("User", userSchema);

export default User;
