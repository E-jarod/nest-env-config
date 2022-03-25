import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyConfigModule } from './configs/my-config.module';

@Module({
  imports: [MyConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
