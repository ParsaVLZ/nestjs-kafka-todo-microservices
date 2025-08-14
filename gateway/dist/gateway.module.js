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
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: "USER_SERVICE",
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            clientId: "user",
                            brokers: ["localhost:29092"],
                        },
                        consumer: {
                            groupId: "user-consumer",
                        },
                    },
                },
                {
                    name: "TOKEN_SERVICE",
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            clientId: "token",
                            brokers: ["localhost:29092"],
                        },
                        consumer: {
                            groupId: "token-consumer",
                        },
                    },
                },
                {
                    name: "TASK_SERVICE",
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            clientId: "task",
                            brokers: ["localhost:29092"],
                        },
                        consumer: {
                            groupId: "task-consumer",
                        },
                    },
                },
            ]),
        ],
        controllers: [user_controller_1.UserController, task_controller_1.TaskController],
        providers: [],
    })
], GatewayModule);
//# sourceMappingURL=gateway.module.js.map