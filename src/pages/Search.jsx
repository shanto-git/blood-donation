import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAxiosSecure from '../hooks/useAxiosSecure';

const SearchItem = () => {
    const [districts, setDistricts] = useState([]); 
    const [upazilas, setUpazilas] = useState([]);   
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const [donors, setDonors] = useState([]);
    const axiosSecure= useAxiosSecure()

    useEffect(() => {
        fetch('/district.json')
            .then(res => res.json())
            .then(data => setDistricts(data));

        fetch('/upozilas.json')
            .then(res => res.json())
            .then(data => setUpazilas(data));
    }, []);

    const handleDistrictChange = (e) => {
        const districtId = e.target.value; 
        const filtered = upazilas.filter(u => u.district_id === districtId);
        setFilteredUpazilas(filtered);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const bloodGroup = e.target.bloodGroup.value;
        const district = e.target.district.value;
        const upazila = e.target.upazila.value;

        axiosSecure.get(`/search`, {
            params: { bloodGroup, district, upazila }
        })
        .then(res => setDonors(res.data));
    };

    return (
        <div className="container mx-auto p-6">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-100 p-6 rounded-lg">
                <select name="bloodGroup" className="select select-bordered" required>
                    <option value="">Blood Group</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                </select>
                <select name="district" className="select select-bordered" onChange={handleDistrictChange} required>
                    <option value="">Select District</option>
                    {districts.map(d => <option key={d._id} value={d.id}>{d.name}</option>)}
                </select>

                <select name="upazila" className="select select-bordered" required>
                    <option value="">Select Upazila</option>
                    {filteredUpazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                </select>

                <button type="submit" className="btn btn-primary">Search</button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                {donors.map(donor => (
                    <div key={donor._id} className="card shadow-lg bg-white p-4">
                        <h3 className="font-bold text-lg">{donor.name}</h3>
                        <p>Group: {donor.bloodGroup}</p>
                        <p>Location: {donor.upazila}, {donor.district}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchItem;