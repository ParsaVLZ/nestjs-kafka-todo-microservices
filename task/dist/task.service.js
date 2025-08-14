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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const status_enum_1 = require("./enum/status.enum");
const task_schema_1 = require("./schema/task.schema");
let TaskService = class TaskService {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    async create(taskDto) {
        const { description, title, userId } = taskDto;
        const task = await this.taskModel.create({
            title,
            description,
            status: status_enum_1.TaskStatus.Pending,
            userId,
        });
        return {
            message: "created",
            status: common_1.HttpStatus.CREATED,
            error: false,
            data: task,
        };
    }
    async getList(userId) {
        const tasks = await this.taskModel.find({ userId });
        return {
            message: "successfully",
            data: tasks,
            status: common_1.HttpStatus.OK,
        };
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(task_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TaskService);
//# sourceMappingURL=task.service.js.map