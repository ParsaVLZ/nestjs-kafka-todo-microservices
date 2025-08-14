import {Controller} from "@nestjs/common";
import {MessagePattern, Payload} from "@nestjs/microservices";
import {IUser, LoginDto, UserId} from "./interface/user.interface";
import {UserPatterns} from "./user.event";
import {UserService} from "./user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @MessagePattern(UserPatterns.Signup)
  signup(@Payload() userDto: IUser) {
    return this.userService.signup(userDto);
  }
  @MessagePattern(UserPatterns.Login)
  login(@Payload() userDto: LoginDto) {
    return this.userService.login(userDto);
  }
  @MessagePattern(UserPatterns.GetUserById)
  findById(@Payload() userDto: UserId) {
    return this.userService.findById(userDto);
  }
}