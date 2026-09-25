/*
- Register the controllers and providers array
- Modules encapsulates its own providers by default
- Organize your modules into feature modules which can register some of the controllers and providers that relates to it and then yu import the feature module into the main app.module eg:
@Module({
imports: [featureModule]
})

- By defaults modules are singletones so you can share instance of any provider btn multiple modules
  @Module({
    controllers: [CatsControllers],
    providers: [CatsService],
    exports: [CatsService] // enables reusability of this service across the other codebases one the import the module
  })

- Supports dependency injection: A module can also inject providers for config purposes
- @Global() decorator makes a module global and can be accessed across the entire application

// Dynamic modules
- helps to create modules that are configured at runtime: import DynamicModule, Module

  import { DynamicModule, Module } from '@nestjs/common';
  import { FEATURE_FLAGS } from './feature-flags.constants.js';
  import { FeatureFlagsService } from './feature-flags.service.js';

  @Module({
    providers: [FeatureFlagsService],
    exports: [FeatureFlagsService],
  })
  export class FeatureFlagsModule {
    static forRoot(flags: Record<string, boolean>): DynamicModule {
      return {
        module: FeatureFlagsModule,
        providers: [{ provide: FEATURE_FLAGS, useValue: flags }],
      };
    }
  }

// Middleware registry

// Route wildcards - *splat / *wildcard / *allroutes eg:
 forRoutes({
  path: 'abcd/*splat',
  method: RequestMethod.All,
 })


// Exclude routes:
- using exclude() method
*/

import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { LoggerMiddleware } from './logger.middleware.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'api',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  // configure method can be made asynchronous if need be for it to await the completion of an asynchronous operation inside the method body
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware) // accepts either a single middleware/multiple arguments to specify multiple middleware
      .exclude(
        {path: 'user', method: RequestMethod.GET},
        {path: 'user', method: RequestMethod.POST},
        'users/{*splat}'
      )
      // .forRoutes('user') // pass the specific route needed
      .forRoutes({
        path: "user", 
        method: RequestMethod.GET
      }) // to restrict middleware to a particular request method
  }
}
