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
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["hospital_owner", "doctor", "user","pharmacy_owner"],
            required: true,
        },
        profileImage: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
