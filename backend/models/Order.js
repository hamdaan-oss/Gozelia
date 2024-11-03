import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  state: { type: String, required: true },
  email: { type: String, required: true },
  productId: { type: String, required: true },
  productName: { type: String, required: true },  
  productImage: { type: String, required: true }, 
  totalAmount: { type: Number, required: true },
  couponCode: { type: String },
  cod: { type: Boolean, default: false },
});

export default mongoose.model('Order', orderSchema);
