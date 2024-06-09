import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { IUser } from '../models/userModel';
import Order from '../models/oderModel';
import { AuthRequest } from '../middlewares/authMiddleware';

export const createOrder: RequestHandler = asyncHandler(async (req: AuthRequest, res) => {
  const { product, theme, value, isPaid } = req.body;
  const user = req.user as IUser;

  if (!user) {
    res.status(401);
    throw new Error('Not authorized, no user');
  }

  const order = new Order({
    product,
    theme,
    value,
    isPaid,
    user: user._id,
  });

  const createOrder = await order.save();
  res.status(201).json(createOrder);
});

export const updateOrder: RequestHandler = asyncHandler(async (req, res) => {
  const {id} = req.params;
  const {product, theme, value, isPaid} = req.body;

  const order = await Order.findById(id);

  if(order) {
    order.product = product;
    order.theme = theme;
    order.value = value;
    order.isPaid = isPaid;

    const updateOrder = await order.save();
    res.json(updateOrder);
  } else {
    res.status(404);
    throw new Error('Encomenda não encontrada');
  }
})

export const deleteOrder: RequestHandler = asyncHandler(async(req, res) => {
  const {id} = req.params;

  const order = await Order.findById(id);

  if(order) {
    await order.deleteOne();
    res.json({message: 'Encomenda removida'});
  } else {
    res.status(404);
    throw new Error('Encomenda não encontrada');
  }

})

export const getOrders: RequestHandler = asyncHandler(async(req: AuthRequest, res) => {
  const user = req.user as IUser;
  const orders = await Order.find({user: user._id});
  res.json(orders);
})

export const getOrder: RequestHandler = asyncHandler(async(req, res) => {
  const {id} = req.params;

  const order = await Order.findById(id);

  if(order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Encomenda não encontrada');
  }
})
