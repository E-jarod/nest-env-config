import type { ConfigType } from '@nestjs/config';
import { registerAs } from '@nestjs/config';

import type { ServerEnvVariables } from './server-env-variables.model';
import { ConfigurationsId } from '../configs-id.utils';

export const serverConfigurations = registerAs(
  ConfigurationsId.Server,
  () =>
    ({
      requestTimeout: process.env.REQUEST_TIMEOUT || 30,
      connexionTimeout: parseInt(process.env.CONNEXION_TIMEOUT || '5'),
      keepAliveTimeout: process.env.KEEP_ALIVE_TIMEOUT || 5,
    } as ServerEnvVariables),
);

export type ServerConfigurations = ConfigType<typeof serverConfigurations>;
