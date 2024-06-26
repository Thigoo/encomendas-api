import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { IUser } from '../interfaces/user';
import Order from '../models/orderModel';
import { AuthRequest } from '../middlewares/authMiddleware';

export const createOrder: RequestHandler = asyncHandler(
  async (req: AuthRequest, res) => {
    const { product, theme, value, isPaid } = req.body;
    const user = req.user as IUser;

    if (!product || !theme || !value || !isPaid) {
      res.status(400).json({
        message: 'Preencha todos os campos',
      });
    }

    if (!user) {
      res.status(401).json({
        message: 'Não autorizado, sem usuário',
      });
    }

    try {
      const order = await Order.create({
        product,
        theme,
        value,
        isPaid,
        user: user._id,
      });

      res.status(201).json({
        message: 'Encomenda criada com sucesso',
        product: order.product,
        theme: order.theme,
        value: order.value,
        isPaid: order.isPaid,
        user: order.user,
      });
    } catch (error) {
      res.status(401).json({
        message: 'Dados inválidos',
      });
    }
  },
);

export const updateOrder: RequestHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { product, theme, value, isPaid } = req.body;

  const order = await Order.findById(id);

  if (order) {
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
});

export const deleteOrder: RequestHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (order) {
    await order.deleteOne();
    res.json({ message: 'Encomenda removida' });
  } else {
    res.status(404);
    throw new Error('Encomenda não encontrada');
  }
});

export const getOrders: RequestHandler = asyncHandler(
  async (req: AuthRequest, res) => {
    try {
      const user = req.user as IUser;
      const orders = await Order.find({ user: user._id });
      res.status(200).json(orders);
    } catch (error) {
      res.status(401).json({
        message: 'Usuário não encontrado ou não autenticado',
      });
    }
  },
);

export const getOrder: RequestHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({
        message: 'Encomenda não encontrada',
      });
    }
  } catch (error) {
    res.status(401).json({
      message: 'Id inválido',
    });
  }
});
