// routes/contact.js
import express from 'express';

const router = express.Router();

// Define a schema for contact messages if you are storing them
import Contact from '../models/Contact.js'; // Adjust the path as necessary

// POST /api/contact
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    // Perform validation here if necessary
    if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Optionally, save the contact message to the database
        const contactMessage = new Contact({ name, email, message });
        await contactMessage.save();
        res.status(201).json({ message: "Contact message sent successfully." });
    } catch (error) {
        console.error('Error saving contact message:', error);
        res.status(500).json({ message: "Failed to send message." });
    }
});

export default router;
