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
const user_controller_1 = require("./user.controller");
const microservices_1 = require("@nestjs/microservices");
const service_1 = require("./enum/service");
const config_service_1 = require("./config/config.service");
const config_1 = require("@nestjs/config");
let GatewayModule = class GatewayModule {
};
exports.GatewayModule = GatewayModule;
exports.GatewayModule = GatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true })
        ],
        controllers: [user_controller_1.UserController],
        providers: [
            config_service_1.ConfigService,
            {
                provide: "USER_SERVICE",
                useFactory() {
                    return microservices_1.ClientProxyFactory.create({
                        transport: microservices_1.Transport.TCP,
                        options: {
                            port: 4001,
                            host: "0.0.0.0",
                        }
                    });
                },
                inject: []
            },
            {
                provide: "TOKEN_SERVICE",
                useFactory() {
                    return microservices_1.ClientProxyFactory.create({
                        transport: microservices_1.Transport.TCP,
                        options: {
                            port: 4002,
                            host: "0.0.0.0",
                        }
                    });
                },
                inject: []
            },
            {
                provide: service_1.Services.TASK,
                useFactory(configService) {
                    const taskServiceOption = configService.get("taskService");
                    return microservices_1.ClientProxyFactory.create(taskServiceOption);
                },
                inject: [config_service_1.ConfigService],
            },
        ],
    })
], GatewayModule);
//# sourceMappingURL=gateway.module.js.map