import { isCelebrateError } from 'celebrate';

const errorHandler = (err: any, req: any, res: any, next: any) => {
  if (isCelebrateError(err)) {

    const errorMessages: string[] = [];

    err.details.forEach((value: any, key: string) => {
      value.details.forEach((detail: any) => {
        errorMessages.push(detail.message);
      });
    });

    return res.status(400).json({
      message: errorMessages,
    });
  }
  res.status(500).json({
    message: ['Erro interno do servidor'],
  });
};

export default errorHandler;
