// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true,
//         },
//         email: {
//             type: String,
//             required: true,
//             unique: true,
//         },
//         password: {
//             type: String,
//         },
//         phone: {
//             type: String,
//         },
//         profileImage: {
//             type: String,
//         },
//         role: {
//             type: String,
//             default: "user",
//         },
//         authProvider: {
//             type: String,
//             enum: ["local", "google"],
//             default: "local",
//         },
//     },
//     { timestamps: true },
// );

// export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
    },

    phone: {
      type: String,
    },

    profileImage: {
      type: String,
    },

    role: {
      type: String,
      default: "user",
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    // ✅ Email verification
    isVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationToken: String,
    emailVerificationExpire: Date,

    // ✅ Forgot password
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
