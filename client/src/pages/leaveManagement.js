import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './leaveManagement.css';

const LeaveManagement = () => {
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        try {
            const response = await axios.get('/api/leaves');
            setLeaves(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="leave-management">
            <h1>Leave Management</h1>
            <table>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leaves.map((leave) => (
                        <tr key={leave._id}>
                            <td>{leave.employeeId}</td>
                            <td>{leave.startDate}</td>
                            <td>{leave.endDate}</td>
                            <td>{leave.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaveManagement;
