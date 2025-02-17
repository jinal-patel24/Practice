// const passValidate = (password) => {
//     const strongPass = /^(?=.*[A-Z])(?=.*\d).+$/;
//     return strongPass.test(password);
// };

// module.exports = { passValidate };
export const passValidate = (password) => {
    const strongPass = /^(?=.*[A-Z])(?=.*\d).+$/;
    return strongPass.test(password);
};
