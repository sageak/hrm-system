const Employee = require('../models/Employee');

exports.getEmployees = async (req, res) => {
    const employees = await Employee.find();
    res.status(200).json(employees);
};

exports.addEmployee = async (req, res) => {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json(newEmployee);
};

exports.updateEmployee = async (req, res) => {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEmployee);
};

exports.deleteEmployee = async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Employee deleted' });
};
