import type { CamelCaseEnvVariables } from '../env-variables.schema';

export type DatabaseEnvVariables = Pick<
  CamelCaseEnvVariables,
  'databaseHost' | 'databasePort'
>;
