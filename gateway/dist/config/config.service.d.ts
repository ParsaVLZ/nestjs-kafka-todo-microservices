import { MicroserviceOptions } from "@nestjs/microservices";
export interface IConfigService {
    port: number;
    mailerService: MicroserviceOptions;
    permissionService: MicroserviceOptions;
    tokenService: MicroserviceOptions;
    taskService: MicroserviceOptions;
    userService: MicroserviceOptions;
}
export declare class ConfigService {
    private envConfig;
    constructor();
    get(key: keyof IConfigService): any;
}
