import React, { useState } from 'react';
import axios from 'axios';
import './AddSightings.css';
import toast from 'react-hot-toast';

const AddSightings = () => {
    const [formData, setFormData] = useState({
        // Initialize with some dummy data
        YEAR: "2022",
        SEASON: "Spring",
        STATE: "California",
        COUNTY: "Los Angeles",
        LOCATION_DETAILS: "City Park",
        OBSERVED: "Saw a mysterious creature in the park.",
        OTHER_WITNESSES: "None",
        TIME_AND_CONDITIONS: "Daytime",
        REPORT_NUMBER: "1",
        REPORT_CLASS: "Class B",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to the /sightings route with the form data
            await axios.post('/sightings', formData);
            toast.success('Sighting submitted successfully!');
            setFormData({
                YEAR: "",
                SEASON: "",
                STATE: "",
                COUNTY: "",
                LOCATION_DETAILS: "",
                OBSERVED: "",
                OTHER_WITNESSES: "",
                TIME_AND_CONDITIONS: "",
                REPORT_NUMBER: "",
                REPORT_CLASS: "",
            })
        } catch (error) {
            toast.error('Error submitting sighting:', error);
        }
    };

    return (
        <div className="sightings-form-container">
            <h2>Sightings Form</h2>
            <form onSubmit={handleSubmit}>
                {/* Add input fields for each property in the formData */}

            </form>
        </div>
    );
};

export default AddSightings;
