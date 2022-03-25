import type { ConfigType } from '@nestjs/config';
import { registerAs } from '@nestjs/config';

import type { AppEnvVariables } from './app-env-variables.model';
import { ConfigurationsId } from '../configs-id.utils';

export const appConfigurations = registerAs(
  ConfigurationsId.Application,
  () =>
    ({
      nodeEnv: process.env.NODE_ENV,
      appPort: process.env.APP_PORT || 3000,
    } as AppEnvVariables),
);

export type AppConfigurations = ConfigType<typeof appConfigurations>;
