import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { EnvVariables } from './env-variables.schema';

export function validate(config: Record<string, unknown>) {
  console.log(config);
  const validatedConfig = plainToClass(EnvVariables, config, {
    enableImplicitConversion: true,
    // exposeDefaultValues: true,
  });

  // console.log(config.DATABASE_HOST, validatedConfig.DATABASE_HOST);

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    enableDebugMessages: true,
    skipUndefinedProperties: false,
    skipNullProperties: false,
  });

  if (errors.length > 0) throw new Error(errors.toString());

  return validatedConfig;
}
