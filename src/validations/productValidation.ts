import { Joi } from 'celebrate';

export const productValidation = {
  body: Joi.object({
    name: Joi.string().required().messages({
      'any.required': 'O campo "name" é obrigatório',
      'string.base': 'O campo "name" não pode ser vazio',
    }),
    value: Joi.number().greater(0).required().messages({
      'any.required': 'O campo "value" é obrigatório',
      'number.base': 'O campo "value" deve ser um número',
      'number.greater': 'O campo "value" deve ser maior que zero',
    }),
  }).options({ abortEarly: false }),
};
