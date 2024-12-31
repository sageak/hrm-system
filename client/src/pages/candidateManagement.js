import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './candidateManagement.css';

const CandidateManagement = () => {
    const [candidates, setCandidates] = useState([]);
    const [newCandidate, setNewCandidate] = useState({ name: '', email: '' });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            const response = await axios.get('/api/candidates');
            setCandidates(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCandidate({ ...newCandidate, [name]: value });
    };

    const handleAddCandidate = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/candidates', newCandidate);
            fetchCandidates();
            setNewCandidate({ name: '', email: '' });
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteCandidate = async (id) => {
        try {
            await axios.delete(`/api/candidates/${id}`);
            fetchCandidates();
        } catch (err) {
            console.error(err);
        }
    };

    const filteredCandidates = candidates.filter((candidate) =>
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="candidate-management">
            <h1>Candidate Management</h1>
            <input
                type="text"
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <form onSubmit={handleAddCandidate}>
                <input
                    type="text"
                    name="name"
                    placeholder="Candidate Name"
                    value={newCandidate.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Candidate Email"
                    value={newCandidate.email}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Add Candidate</button>
            </form>
            <ul>
                {filteredCandidates.map((candidate) => (
                    <li key={candidate._id}>
                        {candidate.name} - {candidate.email}{' '}
                        <button onClick={() => handleDeleteCandidate(candidate._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CandidateManagement;
