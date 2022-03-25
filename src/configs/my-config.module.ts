import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { MyConfigService } from './my-config.service';
import { validate } from './env.validation';
import { appConfigurations } from './app/app.config';
import { serverConfigurations } from './server/server.config';
import { databaseConfigurations } from './databases/database.config';

// see @nestjs/config : https://github.com/nestjs/config
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        appConfigurations,
        serverConfigurations,
        databaseConfigurations,
      ],
      validate,
      validationOptions: {
        allowUnknown: false,
        abortEarly: true,
      },
    }),
  ],
  providers: [MyConfigService],
  exports: [MyConfigService],
})
export class MyConfigModule {}
