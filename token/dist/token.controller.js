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
exports.TokenController = void 0;
const common_1 = require("@nestjs/common");
const token_service_1 = require("./token.service");
const microservices_1 = require("@nestjs/microservices");
const token_events_1 = require("./enum/token.events");
let TokenController = class TokenController {
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    async createUserToken({ userId }) {
        return this.tokenService.createToken(userId);
    }
    async verifyToken({ token }) {
        return this.tokenService.verifyToken(token);
    }
    async destroyToken({ userId }) {
        return this.tokenService.destroyToken(userId);
    }
};
exports.TokenController = TokenController;
__decorate([
    (0, microservices_1.MessagePattern)(token_events_1.TokenPatterns.CreateUserToken),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TokenController.prototype, "createUserToken", null);
__decorate([
    (0, microservices_1.MessagePattern)(token_events_1.TokenPatterns.VerifyToken),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TokenController.prototype, "verifyToken", null);
__decorate([
    (0, microservices_1.MessagePattern)(token_events_1.TokenPatterns.TokenDestroy),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TokenController.prototype, "destroyToken", null);
exports.TokenController = TokenController = __decorate([
    (0, common_1.Controller)("token"),
    __metadata("design:paramtypes", [token_service_1.TokenService])
], TokenController);
//# sourceMappingURL=token.controller.js.map