"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const task_module_1 = require("./task.module");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(task_module_1.TaskModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: ["amqp://localhost:5672"],
            queue: "task-service",
            queueOptions: {
                durable: false,
            },
        },
    });
    await app.listen();
    console.log("task service: localhost:4003");
}
bootstrap();
//# sourceMappingURL=main.js.map