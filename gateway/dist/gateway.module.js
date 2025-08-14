"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const task_controller_1 = require("./task.controller");
const user_controller_1 = require("./user.controller");
let GatewayModule = class GatewayModule {
};
exports.GatewayModule = GatewayModule;
exports.GatewayModule = GatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [user_controller_1.UserController, task_controller_1.TaskController],
        providers: [
            {
                provide: "USER_SERVICE",
                useFactory() {
                    return microservices_1.ClientProxyFactory.create({
                        transport: microservices_1.Transport.RMQ,
                        options: {
                            urls: ["amqp://localhost:5672"],
                            queue: "user-service",
                            queueOptions: {
                                durable: false,
                            },
                        },
                    });
                },
                inject: [],
            },
            {
                provide: "TOKEN_SERVICE",
                useFactory() {
                    return microservices_1.ClientProxyFactory.create({
                        transport: microservices_1.Transport.RMQ,
                        options: {
                            urls: ["amqp://localhost:5672"],
                            queue: "token-service",
                            queueOptions: {
                                durable: false,
                            },
                        },
                    });
                },
                inject: [],
            },
            {
                provide: "TASK_SERVICE",
                useFactory() {
                    return microservices_1.ClientProxyFactory.create({
                        transport: microservices_1.Transport.RMQ,
                        options: {
                            urls: ["amqp://localhost:5672"],
                            queue: "task-service",
                            queueOptions: {
                                durable: false,
                            },
                        },
                    });
                },
                inject: [],
            },
        ],
    })
], GatewayModule);
//# sourceMappingURL=gateway.module.js.map