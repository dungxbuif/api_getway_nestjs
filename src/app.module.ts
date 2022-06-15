import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { baseEnv, baseEnvConfig } from './commons/configs/base.config';
import { apiEnv } from './proxy/configs/api.config';
import { ProxyModule } from './proxy/proxy.module';
import { ProxyService } from './proxy/proxy.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      ...baseEnvConfig,
      isGlobal: true,
      load: [baseEnv, apiEnv],
    }),
    ProxyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private readonly proxyService: ProxyService) {}

  configure(consumer: MiddlewareConsumer) {
    this.proxyService.setupProxies(consumer);
  }
}
