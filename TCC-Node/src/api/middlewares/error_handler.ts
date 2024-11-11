/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { enviorment } from '../../configs/config';

interface CustomError extends Error {
    statusCode?: number;
}

const ErrorHandler = (
    err: CustomError,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    const statusCode = err.statusCode ?? 500;
    const errorMessage = err.message || 'Ocorreu um erro inesperado';
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: errorMessage,
        stack: enviorment === 'development' ? err.stack : {}
    });
};

export default ErrorHandler;
