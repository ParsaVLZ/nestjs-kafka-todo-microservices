import { TaskDto } from "./interface/task.interface";
import { TaskService } from "./task.service";
export declare class TaskController {
    private taskService;
    constructor(taskService: TaskService);
    create(taskDto: TaskDto): Promise<{
        message: string;
        status: import("@nestjs/common").HttpStatus;
        error: boolean;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema/task.schema").Task, {}, {}> & import("./schema/task.schema").Task & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./schema/task.schema").Task, {}, {}> & import("./schema/task.schema").Task & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    get({ userId }: {
        userId: string;
    }): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema/task.schema").Task, {}, {}> & import("./schema/task.schema").Task & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./schema/task.schema").Task, {}, {}> & import("./schema/task.schema").Task & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        status: import("@nestjs/common").HttpStatus;
    }>;
}
