import type { ConfigType } from '@nestjs/config';
import { registerAs } from '@nestjs/config';

import type { DatabaseEnvVariables } from './database-env-variables.model';
import { ConfigurationsId } from '../configs-id.utils';

export const databaseConfigurations = registerAs(
  ConfigurationsId.Database,
  () =>
    ({
      databaseHost: process.env.DATABASE_HOST,
      databasePort: parseInt(process.env.DATABASE_PORT!),
    } as DatabaseEnvVariables),
);

export type DatabaseConfigurations = ConfigType<
  typeof databaseConfigurations
>;
