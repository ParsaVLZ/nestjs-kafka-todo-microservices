"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const task_module_1 = require("./task.module");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(task_module_1.TaskModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: "0.0.0.0",
            port: +process.env.TASK_SERVICE_PORT,
        },
    });
    await app.listen();
    console.log("task microservice started: ", +process.env.TASK_SERVICE_PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map