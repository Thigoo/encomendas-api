import { RequestHandler } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import asyncHandler from 'express-async-handler';
import { IUser } from '../interfaces/user';
import Product from '../models/productModel';

export const createProduct: RequestHandler = asyncHandler(
  async (req: AuthRequest, res) => {
    const { name, value } = req.body;
    const user = req.user as IUser;

    if (!user) {
      res.status(401);
      throw new Error('Não autorizado, sem usuário');
    }

    const product = new Product({
      name,
      value,
      user: user._id,
    });

    const createProduct = await product.save();
    res.status(201).json(createProduct);
  },
);

export const updateProduct: RequestHandler = asyncHandler(
  async (req: AuthRequest, res) => {
    const { id } = req.params;
    const { name, value } = req.body;

    const product = await Product.findById(id);

    if (product) {
      product.name = name;
      product.value = value;
      const updateProduct = await product.save();
      res.json(updateProduct);
    } else {
      res.status(404);
      throw new Error('Produto não encontrado');
    }
  },
);

export const deleteProduct: RequestHandler = asyncHandler(
  async (req: AuthRequest, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Produto removido com sucesso' });
    } else {
      res.status(404);
      throw new Error('Produto não encontrado');
    }
  },
);

export const getProducts: RequestHandler = asyncHandler(
  async (req: AuthRequest, res) => {
    const user = req.user as IUser;
    const products = await Product.find({ user: user.id });
    res.json(products);
  },
);

export const getProduct: RequestHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id });

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Produto não encontrado');
  }
});
