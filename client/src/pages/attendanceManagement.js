import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './attendanceManagement.css';

const AttendanceManagement = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);

    useEffect(() => {
        fetchAttendanceRecords();
    }, []);

    const fetchAttendanceRecords = async () => {
        try {
            const response = await axios.get('/api/attendance');
            setAttendanceRecords(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="attendance-management">
            <h1>Attendance Management</h1>
            <table>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Date</th>
                        <th>Tasks</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceRecords.map((record) => (
                        <tr key={record._id}>
                            <td>{record.employeeId}</td>
                            <td>{record.date}</td>
                            <td>
                                {record.tasks.map((task, index) => (
                                    <div key={index}>
                                        {task.taskName} - {task.status}
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceManagement;
