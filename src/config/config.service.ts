import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';

@Injectable(/* { scope: Scope.REQUEST }*/)
export class ConfigService {
  private readonly envConfig: Record<string, any>;

  constructor(@Inject('CONFIG_OPTIONS') private options: Record<string, any>) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
    this.envConfig = dotenv.parse(readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
