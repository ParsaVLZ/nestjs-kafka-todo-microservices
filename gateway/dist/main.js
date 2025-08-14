"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const gateway_module_1 = require("./gateway.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(gateway_module_1.GatewayModule);
    const options = new swagger_1.DocumentBuilder()
        .setTitle("Nestjs-Microservice")
        .setVersion("v1")
        .addBearerAuth({
        type: "http",
        bearerFormat: "JWT",
        in: "header",
        scheme: "bearer"
    }, "Authorization")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup("/", app, document);
    await app.listen(6500, () => {
        console.log("gateway running on: http://localhost:6500");
    });
}
bootstrap();
//# sourceMappingURL=main.js.map