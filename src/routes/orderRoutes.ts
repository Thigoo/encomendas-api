import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from '../controllers/orderController';
import { celebrate } from 'celebrate';
import { orderValidation } from '../validations/orderValidation';

const router = express.Router();

router
  .route('/')
  .post(protect, celebrate(orderValidation), createOrder)
  .get(protect, getOrders);

router
  .route('/:id')
  .get(protect, getOrder)
  .put(protect, updateOrder)
  .delete(protect, deleteOrder);

export default router;
