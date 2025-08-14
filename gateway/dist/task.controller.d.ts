import { HttpStatus } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Request } from "express";
import { CreateTaskDto } from "./dto/task.dto";
export declare class TaskController {
    private taskServiceClient;
    constructor(taskServiceClient: ClientProxy);
    tasks(req: Request): Promise<{
        message: string;
        data: {
            tasks: any;
        };
    }>;
    create(taskDto: CreateTaskDto, req: Request): Promise<{
        message: string;
        status: HttpStatus;
        data: any;
    }>;
}
