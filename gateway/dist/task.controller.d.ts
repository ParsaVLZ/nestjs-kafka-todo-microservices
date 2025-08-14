import { OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { Request } from "express";
import { TaskDto } from "./dto/task.dto";
export declare class TaskController implements OnModuleInit {
    private taskClientService;
    constructor(taskClientService: ClientKafka);
    onModuleInit(): Promise<void>;
    createTask(createDto: TaskDto, req: Request): Promise<{
        message: any;
        data: any;
    }>;
    userTasks(req: Request): Promise<any>;
}
