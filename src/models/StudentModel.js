import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const studentSchema = mongoose.Schema({
    name: {type: String},
    password: {type: String},
    email: {type: String, Unique: true, required: true},
    role: {type: String,
        enum: ["fronend-dev", "devops", "tester"],
        default: "tester"}
});

// studentSchema.pre('save', async function (next) {
//     const hashedPassword = await bcrypt.hash(this.password,10);
//     this.password = hashedPassword;
//     next();
// });

export const Student = mongoose.model("student",studentSchema)