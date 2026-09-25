/* 
- is called before the route handler
- has access to the req and res objects
- next()

// Roles of middleware:
- execute any code
- make changes to the req & res objects
- end req & res cycles
- calls the next middleware function in the stack
- calls next() method to pas controll to the next middleware fn

// Dependency Injection
- injects dependencies that are available within the same module and the dependencies are injected through a constructor.

// Applying the middleware
- registered in the app.module.ts using the configure() method of the module class.
- modules tha include middleware must implement the NextModule

*/

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// class middleware
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}

// Function middleware
export function logger(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
}