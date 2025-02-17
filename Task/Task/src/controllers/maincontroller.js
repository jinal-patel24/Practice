import bcrypt from "bcryptjs"; // Library for password hashing
import jwt from "jsonwebtoken"; // Library for token generation
import { passValidate } from "../utils/passvalidation.js"; // Utility function for password validation
import { createStudent, findStudentByEmail, updateStudentById, findStudentById } from "../services/studentservice.js"; // Services for Student model
import Student from "../models/studentModel.js"; // Student model
import ClassModel from "../models/classModel.js"; // Class model

// ----------- CLASS CONTROLLERS -----------

// Create a new class
const createClass = async (req, res) => {
    const { body } = req;
    try {
        // Create and save a new class document
        const classObj = await new ClassModel({
            name: body.name,
            facultyName: body.faculty,
            studentId: body.studentId,
        }).save();

        return res.status(200).json({ message: "Class successfully added!", data: classObj });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

// Get all classes with student details
const getClass = async (req, res) => {
    try {
        // Fetch all classes and populate studentId field with student details
        const classObj = await ClassModel.find().populate('studentId');
        
        return res.status(200).json({ message: "Class successfully fetched!", data: classObj });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

// Add students to a class
const addStudentsToClass = async (req, res) => {
    const { id } = req.params; // Class ID from URL params
    const { studentIds } = req.body; // List of student IDs from request body

    try {
        // Find the class by ID and add students to the studentId array
        const classObj = await ClassModel.findByIdAndUpdate(
            id,
            { $push: { studentId: studentIds } }, // Push new student IDs to the array
            { new: true } // Return the updated document
        );

        if (!classObj) {
            return res.status(404).send({ message: "Class not found!" });
        }

        return res.status(200).send({
            message: "Students successfully added to the class",
            data: classObj,
        });
    } catch (error) {
        console.log("Error in addStudentsToClass:", error);
        return res.status(500).send({ message: "Internal Server Error!" });
    }
};

// ----------- STUDENT CONTROLLERS -----------

// Sign up a new student
const signup = async (req, res, next) => {
    const { email, name, mobileno, password } = req.body;

    // Validate password format
    if (!passValidate(password)) {
        return res.status(401).send({ message: "Password must contain one uppercase letter and one number" });
    }

    try {
        // Hash the password and create a new student
        const hashPassword = await bcrypt.hash(password, 10);
        const newStudent = await createStudent({ email, name, mobileno, password: hashPassword });

        res.status(201).send({ message: "Student created successfully!", student: newStudent });
    } catch (err) {
        next(err); // Pass the error to the error-handling middleware
    }
};

// Login an existing student
const Login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        console.log("in login api!");
        
        // Find the student by email
        const student = await findStudentByEmail(email);

        if (!student) return res.status(404).send({ message: "Student not found" });

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, student.password);

        if (!isPasswordValid) return res.status(401).send({ message: "Invalid credentials" });

        // Generate access and refresh tokens
        const accessToken = jwt.sign({ id: student._id, name: student.name }, process.env.SECRET_KEY, { expiresIn: "1h" });
        const refreshToken = jwt.sign({ id: student._id }, process.env.SECRET_KEY, { expiresIn: "7d" });

        res.status(200).send({ message: "Login successful", accessToken, refreshToken });
    } catch (err) {
        next(err);
    }
};

// Update student details
const updateStudent = async (req, res, next) => {
    const { name, mobileno } = req.body;

    try {
        // Update the student's name and mobile number
        const updatedStudent = await updateStudentById(req.studentId, { name, mobileno });
        res.send({ message: "Student updated successfully!", student: updatedStudent });
    } catch (err) {
        next(err);
    }
};

// Get a list of students with pagination
const getStudent = async (req, res, next) => {
    try {
        let { page, limit } = req.query;
        page = page || 1;
        limit = limit || 10;

        // Fetch active students with pagination
        const students = await Student.find({ isActive: true })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Student.countDocuments({ isActive: true });

        const totalPages = Math.ceil(parseInt(total) / parseInt(limit));
        return res.status(200).json({ message: "Data retrieved successfully!", data: students, total, page, limit, totalPages });
    } catch (error) {
        next(error);
    }
};

// Soft delete a student (set isActive to false)
const deleteStudent = async (req, res, next) => {
    const { id } = req.params;

    try {
        const student = await Student.findOne({ _id: id, isActive: true });

        if (!student) {
            return res.status(404).json({ message: "Student not exists!" });
        }

        await Student.findByIdAndUpdate(id, { isActive: false });

        return res.status(200).json({ message: "Student successfully deleted!" });
    } catch (err) {
        next(err);
    }
};

// ----------- PASSWORD CONTROLLER -----------

// Update student password
const updatePassword = async (req, res, next) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    try {
        const studentId = req.body.id;
        const student = await findStudentById(studentId);

        if (!student) {
            return res.status(404).send({ message: "User not found" });
        }

        // Check if the old password is correct
        const isPasswordMatch = await bcrypt.compare(oldPassword, student.password);

        if (!isPasswordMatch) {
            return res.status(401).send({ message: "Old password is incorrect" });
        }

        // Check if new password matches confirm password
        if (newPassword !== confirmPassword) {
            return res.status(400).send({ message: "New password and confirm password do not match" });
        }

        // Validate the new password format
        if (!passValidate(newPassword)) {
            return res.status(400).send({ message: "New password must contain at least one uppercase letter and one number" });
        }

        // Hash and update the new password
        const hashPassword = await bcrypt.hash(newPassword, 10);
        await updateStudentById(studentId, { password: hashPassword });

        return res.send({ message: "Password updated successfully!" });
    } catch (err) {
        next(err);
    }
};

// Export all controllers
export {
    createClass,
    getClass,
    addStudentsToClass,
    signup,
    Login,
    updateStudent,
    getStudent,
    deleteStudent,
    updatePassword,
};