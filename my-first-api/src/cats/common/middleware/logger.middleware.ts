//Middleware là lớp xử lý request trước khi đến controller. T
//hường dùng cho logging, xác thực, chặn request hoặc thêm thông tin vào request.
//Nó cực kỳ quan trọng trong hệ thống thực tế để bảo mật và kiểm soát request.
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`[Logger] ${req.method} ${req.originalUrl}`);
    next();
  }
}
