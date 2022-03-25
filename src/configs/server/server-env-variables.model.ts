import type { CamelCaseEnvVariables } from '../env-variables.schema';

export type ServerEnvVariables = Pick<
  CamelCaseEnvVariables,
  'connexionTimeout' | 'requestTimeout' | 'keepAliveTimeout'
>;
