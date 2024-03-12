// SightingsList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SightingsList.css';

const Sightings = () => {
    const [sightings, setSightings] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetchSightings = async () => {
            try {
                const response = await axios.get('/sightings');
                setSightings(response.data);
            } catch (error) {
                console.error('Error fetching sightings:', error);
            }
        };

        fetchSightings();
    }, []);

    return (
        <div className="sightings-list-container">
            <h2>Sightings List</h2>
            <input type="text" onChange={(e) => setQuery(e.target.value)} />
            <ul>
                {sightings && sightings?.filter((d) =>
                    d?.REPORT_CLASS?.toLowerCase()?.includes(query.toLowerCase()) ||
                    d?.LOCATION_DETAILS?.includes(query.toLowerCase()) ||
                    d?.REPORT_NUMBER?.includes(query.toLowerCase()) ||
                    d?.NEAREST_ROAD?.includes(query.toLowerCase()) ||
                    d?.COUNTY?.includes(query.toLowerCase()) ||
                    d?.STATE?.includes(query.toLowerCase()) ||
                    d?.NEAREST_TOWN?.includes(query.toLowerCase())

                )?.map((sighting) => (
                    <li key={sighting?.REPORT_NUMBER} className="sighting-item">
                        <h3>{sighting?.REPORT_CLASS}</h3>
                        <h3>{sighting?.REPORT_NUMBER}</h3>
                        <h3>{sighting?.COUNTY}</h3>
                        <h3>{sighting?.STATE}</h3>
                        <h3>{sighting?.NEAREST_ROAD}</h3>
                        <h3>{sighting?.NEAREST_TOWN}</h3>
                        <p>{sighting?.LOCATION_DETAILS}</p>
                        {/* Add more details or styling as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sightings;
