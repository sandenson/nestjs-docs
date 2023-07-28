import {
    ContextId,
    ContextIdFactory,
    ContextIdStrategy,
    HostComponentInfo,
} from '@nestjs/core';
import { Request } from 'express';

const tenants = new Map<string, ContextId>();

export class AggregateByTenantContextIdStrategy implements ContextIdStrategy {
  attach(contextId: ContextId, request: Request) {
    const tenantId = request.headers['x-tenant-id'] as string;
    console.log(tenantId, tenants);
    let tenantSubTreeId: ContextId;

    if (tenants.has(tenantId)) {
      tenantSubTreeId = tenants.get(tenantId);
    } else {
      tenantSubTreeId = ContextIdFactory.create();
      tenants.set(tenantId, tenantSubTreeId);
    }

    // return (info: HostComponentInfo) =>
    //   info.isTreeDurable ? tenantSubTreeId : contextId;
    return {
      resolve: (info: HostComponentInfo) => {
        console.log(info);
        return info.isTreeDurable ? tenantSubTreeId : contextId;
      },
      payload: { tenantId },
    };
  }
}
