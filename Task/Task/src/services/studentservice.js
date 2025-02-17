import Student from '../models/studentModel.js'; // Import Student model

// Create new student record
export const createStudent = async (studentData) => {
    const student = new Student(studentData); // Use parameter for student data
    return await student.save(); // Save the record
};

// Find student by email
export const findStudentByEmail = async (email) => {
    return await Student.findOne({ email });
};

// Update student by ID
export const updateStudentById = async (id, updateData) => {
    return await Student.findByIdAndUpdate(id, updateData, { new: true }); // Use parameter for update data
};

// Find student by ID
export const findStudentById = async (id) => {
    return await Student.findById(id);
};
