// server.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch'); // Ensure this is installed
const testRoutes = require('./routes'); // Import your router

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Use the router for GET requests to /
app.use('/', testRoutes);

// Endpoint to create CMS item
app.post('/api/create-cms-item', async (req, res) => {
    const userProfile = req.body;

    try {
        const response = await fetch("https://api.webflow.com/v2/collections/660b7c750a4e24b200bd0e67/items/live", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.WEBFLOW_API_TOKEN}`, // Use environment variable for token
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "cmsLocaleId": '660b7c750a4e24b200bd0e67',
                "isArchived": false,
                "isDraft": false,
                "fieldData": {
                    "name": userProfile.name,
                    "slug": userProfile.name,
                    "cms-id": userProfile.cmsID,
                    "member-id": userProfile.cmsID,
                    "profile-picture": userProfile.pictureUrl,
                    "location": userProfile.address,
                    "bio": userProfile.bio,
                    "email": userProfile.email,
                    "post-body": userProfile.bio,
                }
            }),
        });

        const body = await response.json();
        if (response.ok) {
            res.status(201).json(body);
        } else {
            console.error("Error creating collection item:", body);
            res.status(response.status).json(body);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
