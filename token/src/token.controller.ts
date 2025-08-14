import { Controller } from '@nestjs/common';
import { TokenService } from './token.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TokenPatterns } from './enum/token.events';
export type UserTokenPayload = {userId: string};
export type VerifyToken = {token: string};

@Controller("token")
export class TokenController {
  constructor(private tokenService: TokenService) {}
  @MessagePattern(TokenPatterns.CreateUserToken)
  async createUserToken(@Payload() {userId}: UserTokenPayload) {
    return this.tokenService.createToken(userId);
  }
  @MessagePattern(TokenPatterns.VerifyToken)
  async verifyToken(@Payload() {token}: VerifyToken) {
    return this.tokenService.verifyToken(token);
  }
  @MessagePattern(TokenPatterns.TokenDestroy)
  async destroyToken(@Payload() {userId}: UserTokenPayload) {
    return this.tokenService.destroyToken(userId);
  }
}
