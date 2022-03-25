import { CamelCaseEnvVariables } from '../env-variables.schema';

export type AppEnvVariables = Pick<
  CamelCaseEnvVariables,
  'appPort' | 'nodeEnv'
>;
