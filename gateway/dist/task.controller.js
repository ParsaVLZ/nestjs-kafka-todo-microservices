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
const rxjs_1 = require("rxjs");
const auth_decorator_1 = require("./decorators/auth.decorator");
const task_dto_1 = require("./dto/task.dto");
const task_events_1 = require("./enum/task.events");
let TaskController = class TaskController {
    constructor(taskServiceClient) {
        this.taskServiceClient = taskServiceClient;
    }
    async tasks(req) {
        const { _id: userId } = req.user;
        const taskResponse = await (0, rxjs_1.lastValueFrom)(this.taskServiceClient.send(task_events_1.TaskPatterns.GetUserTasksById, { userId }));
        return {
            message: taskResponse.message,
            data: {
                tasks: taskResponse.data,
            },
        };
    }
    async create(taskDto, req) {
        const { _id: userId } = req.user;
        const { error, message, status, data } = await (0, rxjs_1.lastValueFrom)(this.taskServiceClient.send(task_events_1.TaskPatterns.CreateUserTask, Object.assign({}, taskDto, { userId })));
        if (error) {
            throw new common_1.HttpException({
                message,
                data: null,
                error,
            }, status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return {
            message,
            status,
            data,
        };
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.default)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "tasks", null);
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.default)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.CreateTaskDto, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "create", null);
exports.TaskController = TaskController = __decorate([
    (0, common_1.Controller)("task"),
    (0, swagger_1.ApiTags)("task"),
    __param(0, (0, common_1.Inject)("TASK_SERVICE")),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], TaskController);
//# sourceMappingURL=task.controller.js.map