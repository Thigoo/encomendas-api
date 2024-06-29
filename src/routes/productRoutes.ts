import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../controllers/productController';
import { celebrate } from 'celebrate';
import { productValidation } from '../validations/productValidation';

const router = express.Router();

router
  .route('/')
  .post(protect, celebrate(productValidation), createProduct)
  .get(protect, getProducts);

router
  .route('/:id')
  .get(protect, getProduct)
  .put(protect, celebrate(productValidation),updateProduct)
  .delete(protect, deleteProduct);

export default router;
