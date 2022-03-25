import { Inject, Injectable } from '@nestjs/common';

import type { AppConfigurations } from './app/app.config';
import type { ServerConfigurations } from './server/server.config';
import type { DatabaseConfigurations } from './databases/database.config';
import { appConfigurations } from './app/app.config';
import { databaseConfigurations } from './databases/database.config';
import { serverConfigurations } from './server/server.config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyConfigService {
  constructor(
    @Inject(appConfigurations.KEY)
    private readonly appConfigs: AppConfigurations,
    @Inject(serverConfigurations.KEY)
    private readonly serverConfigs: ServerConfigurations,
    @Inject(databaseConfigurations.KEY)
    private readonly dbConfigs: DatabaseConfigurations,
    private readonly configService: ConfigService,
  ) {}

  get env(): string {
    return this.appConfigs.nodeEnv;
  }

  get port(): number {
    return this.appConfigs.appPort;
  }

  get requestTimeout(): number {
    return this.serverConfigs.requestTimeout;
  }

  get connexionTimeout(): number {
    const a = this.configService.get('server.connexionTimeout');
    console.log('service', a, typeof a);
    console.log(
      'service configs',
      this.serverConfigs.connexionTimeout,
      typeof this.serverConfigs.connexionTimeout,
    );
    return this.serverConfigs.connexionTimeout!;
  }

  get keepAliveTimeout(): number {
    return this.serverConfigs.keepAliveTimeout;
  }

  get dbHost(): string {
    return this.dbConfigs.databaseHost;
  }

  get dbPort(): number | undefined {
    return this.dbConfigs.databasePort;
  }
}
