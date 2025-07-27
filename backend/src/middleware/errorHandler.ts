import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('Error:', err.message);
  
  res.status(500).json({
    success: false,
    error: 'Internal Server Error'
  });
}

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
}
