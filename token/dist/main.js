"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const token_module_1 = require("./token.module");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(token_module_1.TokenModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            port: 4002,
            host: "0.0.0.0"
        }
    });
    await app.listen();
    console.log("tokenService is tunning on: http://localhost:4002");
}
bootstrap();
//# sourceMappingURL=main.js.map