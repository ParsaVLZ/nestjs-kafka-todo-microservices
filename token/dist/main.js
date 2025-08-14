"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const token_module_1 = require("./token.module");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(token_module_1.TokenModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: ["amqp://localhost:5672"],
            queue: "token-service",
            queueOptions: {
                durable: false,
            },
        },
    });
    await app.listen();
    console.log("tokenService: localhost:4002");
}
bootstrap();
//# sourceMappingURL=main.js.map