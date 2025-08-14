"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
console.log();
let ConfigService = class ConfigService {
    constructor() {
        this.envConfig = {};
        this.envConfig.port = +process.env.GATEWAY_SERVICE_PORT;
        this.envConfig.mailerService = {
            transport: microservices_1.Transport.TCP,
            options: {
                host: "0.0.0.0",
                port: +process.env.MAILER_SERVICE_PORT,
            },
        };
        this.envConfig.permissionService = {
            transport: microservices_1.Transport.TCP,
            options: {
                host: "0.0.0.0",
                port: +process.env.PERMISSION_SERVICE_PORT,
            },
        };
        this.envConfig.tokenService = {
            transport: microservices_1.Transport.TCP,
            options: {
                host: "0.0.0.0",
                port: +process.env.TOKEN_SERVICE_PORT,
            },
        };
        this.envConfig.taskService = {
            transport: microservices_1.Transport.TCP,
            options: {
                host: "0.0.0.0",
                port: +process.env.TASK_SERVICE_PORT,
            },
        };
        this.envConfig.userService = {
            transport: microservices_1.Transport.TCP,
            options: {
                host: "0.0.0.0",
                port: +process.env.USER_SERVICE_PORT,
            },
        };
    }
    get(key) {
        return this.envConfig[key];
    }
};
exports.ConfigService = ConfigService;
exports.ConfigService = ConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ConfigService);
//# sourceMappingURL=config.service.js.map