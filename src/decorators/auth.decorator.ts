import { applyDecorators } from '@nestjs/common';
import { Roles } from './roles.decorator';

export const Auth = (...roles: string[]) => applyDecorators(Roles(...roles));
