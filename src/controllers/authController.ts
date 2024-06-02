import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import generateToken from '../utils/generateToken';

const registerUser: RequestHandler = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('Usuário já existe');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString())
    });
  } else {
    res.status(401);
    throw new Error('Dados do usuário inválidos');
  }
});

const authUser: RequestHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString())
    });
  } else {
    res.status(401);
    throw new Error('Credenciais inválidas');
  }
});

export { registerUser, authUser };
