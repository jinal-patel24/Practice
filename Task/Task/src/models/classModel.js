import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        studentId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
        facultyName: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const ClassModel = mongoose.model("Class", classSchema);

export default ClassModel;
