import { Injectable, MiddlewareConsumer } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { ApiType, API_ENV } from './configs/api.config';

@Injectable()
export class ProxyService {
  private microservices: ApiType[];
  constructor(private readonly configService: ConfigService) {
    this.microservices = this.configService.get<ApiType[]>(API_ENV) || [];
  }

  public setupProxies(consumer: MiddlewareConsumer) {
    for (let services of this.microservices)
      consumer
        .apply(createProxyMiddleware(services.proxy))
        .forRoutes(services.routes);
  }
}
