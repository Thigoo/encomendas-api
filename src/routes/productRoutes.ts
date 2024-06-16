import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../controllers/productController';

const router = express.Router();

router.route('/').post(protect, createProduct).get(protect, getProducts);

router
  .route('/:id')
  .get(protect, getProduct)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

export default router;
