import express from 'express';
import Order from '../models/Order.js';
const router = express.Router();

// Save order to MongoDB
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
