import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import generateToken from '../utils/generateToken';
import { AuthRequest } from '../middlewares/authMiddleware';

const registerUser: RequestHandler = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({
      message: 'Usuário ja existe',
    });
  }

  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      message: 'Conta criada com sucesso',
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    console.log('Erro ao criar conta', error);
    res.status(401).json({
      message: 'Dados inválidos',
    });
  }
});

const login: RequestHandler = asyncHandler(async (req, res): Promise<any> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Preencha todos os campos',
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: 'Usuário não encontrado',
    });
  }

  try {
    if (user && (await user.matchPassword(password))) {
      const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };

      return res.status(200).json({
        message: 'Login realizado com sucesso',
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        token: generateToken(user._id.toString()),
      });
    } else {
      return res.status(401).json({
        message: 'Credenciais inválidas',
      });
    }
  } catch (error) {
    console.error('Erro ao fazer login', error);
    res.status(500).json({
      message: 'Erro no servidor',
    });
  }
});

const fetchUserData: RequestHandler = asyncHandler(
  async (req: AuthRequest, res) => {
    try {
      const user = await User.findById(req.user?.id).select('-password');
      res.json(user);
    } catch (error) {
      console.log('Erro ao buscar dados de usuário', error);
    }
  },
);

export { registerUser, login, fetchUserData };
