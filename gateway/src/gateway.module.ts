import {Module} from "@nestjs/common";
import {ClientProxyFactory, RmqOptions, Transport} from "@nestjs/microservices";
import {TaskController} from "./task.controller";
import {UserController} from "./user.controller";

@Module({
  imports: [],
  controllers: [UserController, TaskController],
  providers: [
    {
      provide: "USER_SERVICE",
      useFactory() {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: ["amqp://localhost:5672"],
            queue: "user-service",
            queueOptions: {
              durable: false,
            },
          },
        } as RmqOptions);
      },
      inject: [],
    },
    {
      provide: "TOKEN_SERVICE",
      useFactory() {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: ["amqp://localhost:5672"],
            queue: "token-service",
            queueOptions: {
              durable: false,
            },
          },
        } as RmqOptions);
      },
      inject: [],
    },
    {
      provide: "TASK_SERVICE",
      useFactory() {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: ["amqp://localhost:5672"],
            queue: "task-service",
            queueOptions: {
              durable: false,
            },
          },
        } as RmqOptions);
      },
      inject: [],
    },
  ],
})
export class GatewayModule {}