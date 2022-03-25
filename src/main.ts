import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { MyConfigModule } from './configs/my-config.module';
import { MyConfigService } from './configs/my-config.service';

async function bootstrap(): Promise<void> {
  const ctx = await NestFactory.createApplicationContext(MyConfigModule);
  const configService = ctx.get(MyConfigService);
  await ctx.close();

  const REQUEST_TIMEOUT = configService.requestTimeout;
  const CONNEXION_TIMEOUT = configService.connexionTimeout;
  const KEEP_ALIVE_TIMEOUT = configService.keepAliveTimeout;
  const APP_PORT = configService.port;
  console.warn(CONNEXION_TIMEOUT, typeof CONNEXION_TIMEOUT);

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      // default 0
      connectionTimeout: CONNEXION_TIMEOUT * 1000,
      // default 5000
      keepAliveTimeout: KEEP_ALIVE_TIMEOUT * 1000,
      // default false
      ignoreTrailingSlash: true,
      // default 0
      requestTimeout: REQUEST_TIMEOUT * 1000,
      // default 1048576 (1Mib)
      // bodyLimit: 1048576
    }),
  );
  // // https://github.com/fastify/fastify-formbody
  // app.use(urlencoded({ extended: true, limit: '50mb' }));

  // const REQUEST_TIMEOUT = configService.get('REQUEST_TIMEOUT');

  app.useGlobalPipes(
    new ValidationPipe({
      // automatically transform payloads (coming from the network)
      // to be objects typed according to their DTO classes
      // (= enforce type checking and type casting according to DTO validations)
      transform: true,
      // this will automatically remove non-whitelisted properties
      // (= remove propreties without any decorator in the validation class).
      whitelist: true,
      // when non-whitelisted properties are present,
      // stop the request from processing,
      // return an error response to the user
      // (used alongside `whilelist: true`)
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      // TODO: to verify
      enableDebugMessages: true,
      // groups: []
      // disableErrorMessages: true,
      // validationError: {
      //   target: false,
      //   value: false,
      // },
    }),
  );

  await app.listen(APP_PORT, '0.0.0.0');
}

void bootstrap();
