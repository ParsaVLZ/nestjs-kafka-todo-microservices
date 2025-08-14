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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let AuthGuard = class AuthGuard {
    constructor(userClientService, tokenClientService) {
        this.userClientService = userClientService;
        this.tokenClientService = tokenClientService;
    }
    async onModuleInit() {
        this.userClientService.subscribeToResponseOf("get_user_by_id");
        this.tokenClientService.subscribeToResponseOf("verify_token");
        await Promise.all([
            this.tokenClientService.connect(),
            this.userClientService.connect(),
        ]);
    }
    async canActivate(context) {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        const { authorization = undefined } = request?.headers;
        if (!authorization)
            throw new common_1.UnauthorizedException("authorization header is required");
        const [bearer, token] = authorization?.split(" ");
        if (!bearer || bearer?.toLowerCase() !== "bearer")
            throw new common_1.UnauthorizedException("bearer token is incorrect");
        if (!token)
            throw new common_1.UnauthorizedException("token is required");
        const verifyTokenResponse = await new Promise((resolve, reject) => {
            this.tokenClientService
                .send("verify_token", { token })
                .subscribe((data) => resolve(data));
        });
        if (!verifyTokenResponse || verifyTokenResponse?.error) {
            throw new common_1.HttpException(verifyTokenResponse?.message, verifyTokenResponse?.status);
        }
        const { data } = verifyTokenResponse;
        if (!data || !data?.userId)
            throw new common_1.UnauthorizedException("not found user account");
        const userResponse = await new Promise((resolve, reject) => {
            this.userClientService
                .send("get_user_by_id", { userId: data?.userId })
                .subscribe((data) => resolve(data));
        });
        if (userResponse?.error) {
            throw new common_1.HttpException(userResponse?.message, userResponse?.status);
        }
        if (!userResponse?.data?.user) {
            throw new common_1.UnauthorizedException("not found user account");
        }
        request.user = userResponse?.data?.user;
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("USER_SERVICE")),
    __param(1, (0, common_1.Inject)("TOKEN_SERVICE")),
    __metadata("design:paramtypes", [microservices_1.ClientKafka,
        microservices_1.ClientKafka])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map