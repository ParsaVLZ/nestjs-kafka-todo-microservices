export declare class UserSignupDto {
    name: string;
    email: string;
    password: string;
}
declare const LoginDto_base: import("@nestjs/common").Type<Omit<UserSignupDto, "name">>;
export declare class LoginDto extends LoginDto_base {
}
export {};
