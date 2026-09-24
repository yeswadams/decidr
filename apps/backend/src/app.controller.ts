/*  Notes/Pointers

- responsible for handling incoming requests and sending responses back to client
- to create a controller use the cmd: "nest g controller [name]"
- @httpCode(...) - helps to define the prefered status code for the application
- in the event data is a  JS array/object, next automatically serilizes to JSON and for primitive data type(eg: number, string, boolean), nest sends the data directly without serilization
- findAll(@Res({passthrough: true}) response) - Express and Nest to work together
- http methods supports: @Get() , @Post() , @Put() , @Delete() , @Patch() , @Options() , @Head() , @QueryMethod() - @All - handles all of them
- "abc/*" - applies to all routes that start with abc/ regardles of the number of characters that come after it
- the order of routes matter since nest registers them in declaration order. 
- redirects: @Redirect('https://nestjs.com', 301)

// Dynaminc Routes
@Param() decorator

// Sub-domain Routing
decorator takes a host option to require that the HTTP host of incoming request matches a specific value
@Controller({host: 'admin.example.com'})

@HostParam()

// State Sharing:
connection pool, singleton services with global state, are all shared accross incoming requests

// Asynchronicity: 
- returns a promise: Promise<any[]>
- can also return observable RxJS streams: Observable<any[]>
- choose one that suit your needs best

// Payloads Data Transfer Object(.dto.ts)
- better than interfaces since unlike interfaces they are not scrapped off during transpilation

// Query parameters
  @Get()
  async findAll(@Query('role') role: string, @Query('department') department: string) {
    return `The user's role is: ${role} of the department: ${department}`
  }

  - this yields: GET /user?role=admin&department=engineering

*/

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
