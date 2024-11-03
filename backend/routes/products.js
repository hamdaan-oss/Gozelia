// routes/products.js
import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();

// Get products (all, by category, or by search)
router.get('/', async (req, res) => {
  const { category, search } = req.query;

  try {
    const query = {};

    // If search is provided, search by name or category (case-insensitive)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    // If category is provided, add it to the query
    if (category) {
      query.category = category;
    }

    // Log the constructed query for debugging
    console.log("Constructed Query:", query);

    // Fetch products based on the constructed query
    const products = await Product.find(query);

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error); // Log error for debugging
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: 'Error fetching product by ID' });
  }
});

export default router;
