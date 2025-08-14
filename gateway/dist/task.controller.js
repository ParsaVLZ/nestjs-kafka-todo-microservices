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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("./decorators/auth.decorator");
const task_dto_1 = require("./dto/task.dto");
let TaskController = class TaskController {
    constructor(taskClientService) {
        this.taskClientService = taskClientService;
    }
    async onModuleInit() {
        this.taskClientService.subscribeToResponseOf("create_task");
        this.taskClientService.subscribeToResponseOf("user_tasks");
        await this.taskClientService.connect();
    }
    async createTask(createDto, req) {
        const response = await new Promise((resolve, reject) => {
            this.taskClientService
                .send("create_task", {
                title: createDto.title,
                content: createDto.content,
                userId: req.user._id,
            })
                .subscribe((data) => resolve(data));
        });
        if (response?.error) {
            throw new common_1.HttpException(response?.message, response?.status ?? 500);
        }
        return {
            message: response?.message,
            data: response?.data,
        };
    }
    async userTasks(req) {
        const response = await new Promise((resolve, reject) => {
            this.taskClientService
                .send("user_tasks", { userId: req.user?._id })
                .subscribe((data) => resolve(data));
        });
        return response?.data ?? { tasks: [] };
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_1.Post)("create"),
    (0, swagger_1.ApiConsumes)("application/x-www-form-urlencoded"),
    (0, auth_decorator_1.default)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.TaskDto, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "createTask", null);
__decorate([
    (0, common_1.Get)("user"),
    (0, auth_decorator_1.default)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "userTasks", null);
exports.TaskController = TaskController = __decorate([
    (0, common_1.Controller)("/task"),
    (0, swagger_1.ApiTags)("Task"),
    __param(0, (0, common_1.Inject)("TASK_SERVICE")),
    __metadata("design:paramtypes", [microservices_1.ClientKafka])
], TaskController);
//# sourceMappingURL=task.controller.js.map