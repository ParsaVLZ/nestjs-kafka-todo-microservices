import { HydratedDocument } from "mongoose";
export declare class Task {
    title: string;
    description: string;
    userId: string;
    status: string;
}
export type TaskDocument = HydratedDocument<Task>;
export declare const TaskSchema: import("mongoose").Schema<Task, import("mongoose").Model<Task, any, any, any, import("mongoose").Document<unknown, any, Task, any, {}> & Task & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Task, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Task>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Task> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
