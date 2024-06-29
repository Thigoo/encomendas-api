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
      res.status(401).json({
        message: 'Não autorizado, sem usuário',
      });
    }

    try {
      const product = await Product.create({
        name,
        value,
        user: user._id,
      });

      res.status(201).json({
        message: 'Produto cadastrado com sucesso',
        id: product._id,
        name: product.name,
        value: product.value,
        user: product.user,
      });
    } catch (error) {
      res.status(401).json({
        message: 'Dados inválidos',
      });
    }
  },
);

export const updateProduct: RequestHandler = asyncHandler(
  async (req: AuthRequest, res) => {
    const { id } = req.params;
    const { name, value } = req.body;

    try {
      let product = await Product.findById(id);

      if (!product) {
        res.status(404).json({
          message: 'Produto não encontrado, verifique o ID fornecido',
        });
      }

      product!.name = name;
      product!.value = value;

      const updateProduct = await product!.save();

      res.status(200).json({
        message: 'Produto atualizado com sucesso',
        name: updateProduct.name,
        value: updateProduct.value,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Erro interno ao atualizar produto',
      });
    }
  },
);

export const deleteProduct: RequestHandler = asyncHandler(
  async (req: AuthRequest, res) => {
    const { id } = req.params;

    try {
      const product = await Product.findById(id);
      if (!product) {
        res.status(404).json({
          message: 'Produto não encontrado, verifique o ID fornecido',
        });
      }

      await product!.deleteOne();
      res.status(200).json({
        message: 'Produto removido com sucesso',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Erro interno ao remover o produto',
      });
    }
  },
);

export const getProducts: RequestHandler = asyncHandler(
  async (req: AuthRequest, res) => {
    const user = req.user as IUser;
    try {
      const products = await Product.find({ user: user._id });

      if(products.length === 0) {
        res.status(404).json({
          message: 'Nenhum produto encontrado',
        });
      }

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({
        message: 'Erro interno ao buscar os produtos',
      });
    }
  },
);

export const getProduct: RequestHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if(!product) {
      res.status(404).json({
        message: 'Produto deletado ou ID incorreto',
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({  
      message: 'Erro interno ao buscar o produto',
    });
  }
});
