import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { TcpOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UserModule, {
    transport: Transport.TCP,
    options: {
      port: 4001,
      host: "0.0.0.0"
    }
  } as TcpOptions);
  await app.listen();
  
  console.log("user service running on: localhost:4001");
}
bootstrap();
