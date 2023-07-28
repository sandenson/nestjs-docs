import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = (request as any).user;
    return data ? user['data'] : user;
  },
);
