import express from 'express';
import Coupon from '../models/Coupon.js'; // Ensure you use the correct path and .js extension

const router = express.Router();

// Create a coupon
router.post('/create', async (req, res) => {
  try {
    const { code, discountAmount, applicableProducts, expiryDate, selectedCategory } = req.body; // Adjusted variable name
    const newCoupon = new Coupon({ code, discountAmount, applicableProducts, expiryDate, selectedCategory });
    await newCoupon.save();
    res.status(201).json({ message: 'Coupon created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message || 'An error occurred' });
  }
});

// Validate coupon code
router.post('/validate', async (req, res) => {
  const { code, productId, productName } = req.body;

  try {
    const coupon = await Coupon.findOne({ code });
    if (!coupon) return res.status(400).json({ message: 'Invalid coupon code' });

    const isApplicable = 
      coupon.applicableProducts.length === 0 || 
      coupon.applicableProducts.some(
        (item) => item.productName === productName || item.productName === 'All Products'
      );

    if (isApplicable) {
      res.json({ discountAmount: coupon.discountAmount, applicableProducts: coupon.applicableProducts });
    } else {
      res.status(400).json({ message: 'Coupon is not applicable to this product' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error validating coupon' });
  }
});

// Get all coupons
router.get('/', async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a coupon
router.delete('/:id', async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export the router
export default router;
