import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Services } from './enum/service';
import { ConfigService } from "./config/config.service";
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [UserController],
  providers: [
    ConfigService,
    {
      provide:"USER_SERVICE",
      useFactory(){
        return ClientProxyFactory.create({
          transport: Transport.TCP, 
          options: 
            {
              port:4001,
              host:"0.0.0.0",
            }
          });
      },
      inject: []
    },
    {
      provide:"TOKEN_SERVICE",
      useFactory(){
        return ClientProxyFactory.create({
          transport: Transport.TCP, 
          options: 
            {
              port:4002,
              host:"0.0.0.0",
            }
          });
      },
      inject: []
    },
    {
      provide: Services.TASK,
      useFactory(configService: ConfigService) {
        const taskServiceOption = configService.get("taskService");
        return ClientProxyFactory.create(taskServiceOption);
      },
      inject: [ConfigService],
    },
  ],
})
export class GatewayModule {}
