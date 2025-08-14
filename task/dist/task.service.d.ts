import { HttpStatus } from "@nestjs/common";
import { Model } from "mongoose";
import { TaskDto } from "./interface/task.interface";
import { Task, TaskDocument } from "./schema/task.schema";
export declare class TaskService {
    private taskModel;
    constructor(taskModel: Model<TaskDocument>);
    create(taskDto: TaskDto): Promise<{
        message: string;
        status: HttpStatus;
        error: boolean;
        data: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Task, {}, {}> & Task & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, Task, {}, {}> & Task & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    getList(userId: string): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Task, {}, {}> & Task & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, Task, {}, {}> & Task & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        status: HttpStatus;
    }>;
}
