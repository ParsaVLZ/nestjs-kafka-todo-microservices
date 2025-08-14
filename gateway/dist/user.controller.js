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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("./dto/user.dto");
const rxjs_1 = require("rxjs");
const token_events_1 = require("./enum/token.events");
const user_event_1 = require("./enum/user.event");
const auth_decorator_1 = require("./decorators/auth.decorator");
let UserController = class UserController {
    constructor(userClientService, tokenClientService) {
        this.userClientService = userClientService;
        this.tokenClientService = tokenClientService;
    }
    async signup(signupDto) {
        const response = await (0, rxjs_1.lastValueFrom)(this.userClientService.send("signup", signupDto).pipe((0, rxjs_1.catchError)(err => {
            throw err;
        })));
        if (response?.error) {
            throw new common_1.HttpException(response?.message, response?.status ?? 500);
        }
        if (response?.data?.userId) {
            const tokenResponse = await (0, rxjs_1.lastValueFrom)(this.tokenClientService.send("create_user_token", { userId: response?.data?.userId }));
            if (tokenResponse?.data?.token) {
                return {
                    token: tokenResponse?.data?.token
                };
            }
        }
        throw new common_1.InternalServerErrorException("Some services are missing");
    }
    async login(loginDto) {
        const loginResponse = await (0, rxjs_1.lastValueFrom)(this.userClientService.send(user_event_1.UserPatterns.Login, loginDto).pipe((0, rxjs_1.catchError)((err) => {
            throw err;
        })));
        if (!loginResponse?.error && loginResponse?.data) {
            return {
                token: loginResponse?.data?.token,
            };
        }
        throw new common_1.HttpException(loginResponse?.message, loginResponse?.status);
    }
    async logout(req) {
        const { user } = req;
        return await (0, rxjs_1.lastValueFrom)(this.tokenClientService
            .send(token_events_1.TokenPatterns.TokenDestroy, { userId: user?._id })
            .pipe((0, rxjs_1.catchError)((err) => {
            throw err;
        })));
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiConsumes)("application/x-www-form-urlencoded"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserSignupDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)("login"),
    (0, swagger_1.ApiConsumes)("application/x-www-form-urlencoded"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("logout"),
    (0, auth_decorator_1.default)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('/user'),
    __param(0, (0, common_1.Inject)("USER_SERVICE")),
    __param(1, (0, common_1.Inject)("TOKEN_SERVICE")),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], UserController);
//# sourceMappingURL=user.controller.js.map