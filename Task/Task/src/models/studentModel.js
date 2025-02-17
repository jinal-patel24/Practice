import mongoose from 'mongoose';

// Define the student schema
const studentSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        mobileno: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true, // This will automatically add createdAt and updatedAt fields
    }
);

// Create the Student model
const Student = mongoose.model('Student', studentSchema);

export default Student;
