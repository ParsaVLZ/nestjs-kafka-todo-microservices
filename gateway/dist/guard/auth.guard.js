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
const rxjs_1 = require("rxjs");
let AuthGuard = class AuthGuard {
    constructor(userClientService, tokenClientService) {
        this.userClientService = userClientService;
        this.tokenClientService = tokenClientService;
    }
    async canActivate(context) {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        const { authorization = undefined } = request?.headers;
        if (!authorization)
            throw new common_1.UnauthorizedException("Authorization header is required!");
        const [bearer, token] = authorization?.split(" ");
        if (!bearer || bearer?.toLowerCase() !== "bearer")
            throw new common_1.UnauthorizedException("Bearer token is incorrect!");
        if (!token)
            throw new common_1.UnauthorizedException("Token is required!");
        const verifyTokenResponse = await (0, rxjs_1.lastValueFrom)(this.tokenClientService.send("verify_token", { token }));
        if (!verifyTokenResponse || verifyTokenResponse?.error) {
            throw new common_1.HttpException(verifyTokenResponse?.message, verifyTokenResponse?.status);
        }
        const { data } = verifyTokenResponse;
        if (!data || !data?.userId)
            throw new common_1.UnauthorizedException("User account not found!");
        const userResponse = await (0, rxjs_1.lastValueFrom)(this.userClientService.send("get_user_by_id", { userId: data?.userId }));
        if (userResponse?.error) {
            throw new common_1.HttpException(userResponse?.message, userResponse?.status);
        }
        if (!userResponse?.data?.user) {
            throw new common_1.UnauthorizedException("User account not found!");
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
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map