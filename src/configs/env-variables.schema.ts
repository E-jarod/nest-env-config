import {
  IsEnum,
  IsIP,
  IsNotEmpty,
  IsNotIn,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  isURL,
} from 'class-validator';

import type { KeysToCamelCase } from '@utils/types/keys-to-camel-case.type';
import { falsyValues } from '@utils/validation/falsy-values.utils';

enum Environments {
  Dev = 'dev',
  Prod = 'prod',
  Test = 'test',
  Provision = 'provision',
}

const matchLocalhost = (e: EnvVariables) =>
  !/^localhost$/.test(e.DATABASE_HOST);

const matchDomainNames = (e: EnvVariables) => !isURL(e.DATABASE_HOST);

export class EnvVariables {
  @IsNotEmpty()
  @IsEnum(Environments)
  NODE_ENV!: Environments;

  @IsNotEmpty()
  @IsNotIn(falsyValues)
  @IsNumber()
  APP_PORT!: number;

  @IsOptional()
  @IsNotIn([NaN, ''])
  @IsNumber()
  REQUEST_TIMEOUT: number = 0;

  @IsOptional()
  @IsNotEmpty()
  @IsNotIn(['', NaN])
  @IsNumber()
  CONNEXION_TIMEOUT!: number;

  @IsOptional()
  @IsNotIn(falsyValues)
  @IsNumber()
  KEEP_ALIVE_TIMEOUT: number = 5;

  @IsOptional()
  @IsNotIn(falsyValues)
  @IsNumber()
  DATABASE_PORT?: number;

  @IsNotEmpty()
  @IsNotIn(falsyValues)
  @IsString()
  // accepts localhost...
  @ValidateIf(matchLocalhost)
  // OR accepts url...
  @ValidateIf(matchDomainNames)
  // OR accepts IP
  @IsIP()
  DATABASE_HOST!: string;
}

export type CamelCaseEnvVariables = KeysToCamelCase<EnvVariables>;
