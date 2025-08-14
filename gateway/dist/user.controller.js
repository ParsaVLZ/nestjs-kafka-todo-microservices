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
const rxjs_1 = require("rxjs");
const user_dto_1 = require("./dto/user.dto");
const auth_decorator_1 = require("./decorators/auth.decorator");
let UserController = class UserController {
    constructor(userClientService, tokenClientService) {
        this.userClientService = userClientService;
        this.tokenClientService = tokenClientService;
    }
    async onModuleInit() {
        this.userClientService.subscribeToResponseOf("signup");
        this.userClientService.subscribeToResponseOf("login");
        this.tokenClientService.subscribeToResponseOf("token_destroy");
        this.tokenClientService.subscribeToResponseOf("create_user_token");
        await Promise.all([
            this.userClientService.connect(),
            this.tokenClientService.connect(),
        ]);
    }
    async signup(signupDto) {
        const response = await new Promise((resolve, reject) => {
            this.userClientService
                .send("signup", signupDto)
                .subscribe((data) => resolve(data));
        });
        if (response?.error) {
            throw new common_1.HttpException(response?.message, response?.status ?? 500);
        }
        if (response?.data?.userId) {
            const tokenResponse = await new Promise((resolve, reject) => {
                this.tokenClientService
                    .send("create_user_token", {
                    userId: response?.data?.userId,
                })
                    .subscribe((data) => resolve(data));
            });
            if (tokenResponse?.data?.token) {
                return {
                    token: tokenResponse?.data?.token,
                };
            }
        }
        throw new common_1.InternalServerErrorException("some service is missing");
    }
    async login(loginDto) {
        const response = await new Promise((resolve, reject) => {
            this.userClientService
                .send("login", loginDto)
                .subscribe((data) => resolve(data));
        });
        if (response?.error) {
            throw new common_1.HttpException(response?.message, response?.status ?? 500);
        }
        if (response?.data?.userId) {
            const tokenResponse = await (0, rxjs_1.lastValueFrom)(this.tokenClientService.send("create_user_token", {
                userId: response?.data?.userId,
            }));
            if (tokenResponse?.data?.token) {
                return {
                    token: tokenResponse?.data?.token,
                };
            }
        }
        throw new common_1.InternalServerErrorException("some service is missing");
    }
    async checkLogin(req) {
        return req?.user;
    }
    async logout(req) {
        const { _id } = req?.user;
        const response = await new Promise((resolve, reject) => {
            this.tokenClientService
                .send("token_destroy", { userId: _id })
                .subscribe((data) => resolve(data));
        });
        if (response?.error) {
            throw new common_1.HttpException(response?.message, response?.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return {
            message: response?.message,
        };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)("signup"),
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
    (0, common_1.Get)("check-login"),
    (0, auth_decorator_1.default)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "checkLogin", null);
__decorate([
    (0, common_1.Get)("logout"),
    (0, auth_decorator_1.default)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("/user"),
    (0, swagger_1.ApiTags)("user"),
    __param(0, (0, common_1.Inject)("USER_SERVICE")),
    __param(1, (0, common_1.Inject)("TOKEN_SERVICE")),
    __metadata("design:paramtypes", [microservices_1.ClientKafka,
        microservices_1.ClientKafka])
], UserController);
//# sourceMappingURL=user.controller.js.map