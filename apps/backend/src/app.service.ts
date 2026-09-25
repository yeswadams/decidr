/* 
Services - Are considered as types of Providers
Providers include: Services, Repositories, Factories, Helpers - they can be injected as a dependancy
Handles data storage and retrival for the controller ie. the AppController
Encapsulates app logic and it's a natural candidate for a provider

cmd - nest g service name

// Dependency Injection
- constructor(private userService: CatsService) {}

// Optional providers
- config object: @Optional()
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
