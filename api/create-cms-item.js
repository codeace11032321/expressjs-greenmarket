require('dotenv').config(); // Load environment variables
const fetch = require('node-fetch');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const userProfile = req.body;

        try {
            const response = await fetch("https://api.webflow.com/v2/collections/660b7c750a4e24b200bd0e67/items", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.WEBFLOW_API_TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "isArchived": false,
                    "isDraft": false,
                    "fieldData": {
                        "name": userProfile.name,
                        "slug": userProfile.slug,
                        "cms-id": userProfile.cmsID,
                        "member-id": userProfile.memberID,
                        "profile-picture": userProfile.profilePicture,
                        "location": userProfile.location,
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
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
