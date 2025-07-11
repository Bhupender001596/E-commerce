import mongoose from 'mongoose';
import productModel from './models/productModel.js';
import 'dotenv/config';

async function checkProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');
    
    const products = await productModel.find({});
    console.log('Total products:', products.length);
    
    const bestsellers = await productModel.find({bestseller: true});
    console.log('Bestseller products:', bestsellers.length);
    
    if (bestsellers.length > 0) {
      console.log('Sample bestseller:', bestsellers[0]);
    } else {
      console.log('No bestseller products found');
      console.log('Sample regular product:', products[0]);
    }
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkProducts();
