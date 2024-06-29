import { Joi } from 'celebrate';

export const orderValidation = {
  body: Joi.object({
    product: Joi.string().required().messages({
      'any.required': 'O campo "product" é obrigatório',
      'string.base': 'O campo "product" não pode ser vazio',
    }),
    theme: Joi.string().required().messages({
      'any.required': 'O campo "theme" é obrigatório',
      'string.base': 'O campo "theme" não pode ser vazio',
    }),
    value: Joi.number().greater(0).required().messages({
      'any.required': 'O campo "value" é obrigatório',
      'number.base': 'O campo "value" deve ser um número',
      'number.greater': 'O campo "value" deve ser maior que zero',
    }),
    isPaid: Joi.boolean().required().messages({
      'any.required': 'O campo "isPaid" é obrigatório',
      'boolean.base': 'O campo "isPaid" deve ser um booleano',
    }),
  }).options({ abortEarly: false }),
};
