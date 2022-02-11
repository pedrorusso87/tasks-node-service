"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
var class_validator_1 = require("class-validator");
var moment = require("moment");
var typeorm_1 = require("typeorm");
var task_1 = require("../entity/task");
var user_1 = require("../entity/user");
var TaskController = /** @class */ (function () {
    function TaskController() {
    }
    var _a;
    _a = TaskController;
    TaskController.getAll = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var repository, getTasksResponse, tasks, e_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    repository = (0, typeorm_1.getRepository)(task_1.Task);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, repository.find({
                            relations: ["responsible", "status", "priority"],
                        })];
                case 2:
                    tasks = _b.sent();
                    if (tasks.length > 0) {
                        getTasksResponse = TaskController.parseGetTaskResponse(tasks);
                        response.send(getTasksResponse);
                    }
                    else {
                        return [2 /*return*/, response.status(404).json({ message: "No tasks found." })];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    return [2 /*return*/, response.status(500).json({
                            message: "There was an error in the application. " + e_1,
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    TaskController.getTasksByDashboardId = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var repository, id, tasks, e_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    repository = (0, typeorm_1.getRepository)(task_1.Task);
                    id = request.params;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, repository.find({ dashboard: id })];
                case 2:
                    tasks = _b.sent();
                    return [2 /*return*/, response
                            .status(200)
                            .send(TaskController.parseGetByDashboardResponse(tasks))];
                case 3:
                    e_2 = _b.sent();
                    return [2 /*return*/, response.status(500).json({
                            message: "There was an error in the application. " + e_2,
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    TaskController.deleteTask = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var taskRepository, id, task, e_3;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    taskRepository = (0, typeorm_1.getRepository)(task_1.Task);
                    id = request.params.id;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, taskRepository.findOneOrFail(id)];
                case 2:
                    task = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _b.sent();
                    return [2 /*return*/, response.status(404).json({
                            message: "Task not found.",
                        })];
                case 4:
                    //delete task
                    try {
                        taskRepository.delete(id);
                    }
                    catch (e) {
                        return [2 /*return*/, response.status(500).json({
                                message: "Could not delete taks. " + e,
                            })];
                    }
                    return [2 /*return*/, response.status(200).json({
                            message: "Task deleted successfully.",
                        })];
            }
        });
    }); };
    TaskController.createTask = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, responsible, createdBy, description, status, priority, dueDate, repository, task, errors, e_4;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = request.body, responsible = _b.responsible, createdBy = _b.createdBy, description = _b.description, status = _b.status, priority = _b.priority, dueDate = _b.dueDate;
                    repository = (0, typeorm_1.getRepository)(task_1.Task);
                    task = new task_1.Task();
                    task.createdBy = createdBy;
                    task.responsible = responsible;
                    task.description = description;
                    task.status = status;
                    task.priority = priority;
                    task.dueDate = new Date(dueDate);
                    return [4 /*yield*/, (0, class_validator_1.validate)(task)];
                case 1:
                    errors = _c.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, response.status(400).json(errors)];
                    }
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, repository.save(task)];
                case 3:
                    _c.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_4 = _c.sent();
                    return [2 /*return*/, response.status(500).json({
                            message: "Error creating new task. " + e_4,
                        })];
                case 5:
                    //If everything is ok
                    response.status(201).json({ message: "Task created" });
                    return [2 /*return*/];
            }
        });
    }); };
    TaskController.updateTask = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var id, _b, responsible, dueDate, priority, status, description, taskRepository, task, e_5, user, errors, e_6;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    id = request.params.id;
                    _b = request.body, responsible = _b.responsible, dueDate = _b.dueDate, priority = _b.priority, status = _b.status, description = _b.description;
                    taskRepository = (0, typeorm_1.getRepository)(task_1.Task);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, taskRepository.findOneOrFail(id)];
                case 2:
                    task = _c.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _c.sent();
                    return [2 /*return*/, response.status(404).json({
                            message: "Task not found.",
                        })];
                case 4:
                    if (!responsible) return [3 /*break*/, 6];
                    return [4 /*yield*/, TaskController.findUserForTaskUpdate(responsible)];
                case 5:
                    user = _c.sent();
                    if (user) {
                        task.responsible = user;
                    }
                    else {
                        return [2 /*return*/, response.status(404).json({ message: "No valid user selected" })];
                    }
                    _c.label = 6;
                case 6:
                    task.dueDate = new Date(dueDate) || task.dueDate;
                    task.priority = priority || task.priority;
                    task.status = status || task.status;
                    task.description = description || task.description;
                    return [4 /*yield*/, (0, class_validator_1.validate)(task)];
                case 7:
                    errors = _c.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, response.status(400).json(errors)];
                    }
                    _c.label = 8;
                case 8:
                    _c.trys.push([8, 10, , 11]);
                    return [4 /*yield*/, taskRepository.save(task)];
                case 9:
                    _c.sent();
                    return [3 /*break*/, 11];
                case 10:
                    e_6 = _c.sent();
                    return [2 /*return*/, response.status(500).json({
                            message: "Task update failed. " + e_6,
                        })];
                case 11:
                    response.status(201).json({
                        message: "Task updated.",
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    TaskController.parseGetTaskResponse = function (taskList) {
        taskList.map(function (task) {
            // deleting ids from response
            delete task.responsible.id;
            delete task.status.id;
            delete task.priority.id;
            //formatting dates
            task.dueDate = moment(task.dueDate).format("YYYY-MM-DD");
            task.created_date = moment(task.created_date).format("YYYY-MM-DD");
        });
        return taskList;
    };
    TaskController.parseGetByDashboardResponse = function (taskList) {
        var getTasksResponse = [];
        taskList.map(function (task) {
            var taskResponse = {};
            //formatting dates
            var dueDate = moment(task.dueDate).format("YYYY-MM-DD:HH:mm");
            var createdDate = moment(task.created_date).format("YYYY-MM-DD:HH:mm");
            var description = task.description;
            var id = task.id;
            taskResponse = { id: id, createdDate: createdDate, description: description, dueDate: dueDate };
            getTasksResponse.push(taskResponse);
        });
        return getTasksResponse;
    };
    TaskController.findUserForTaskUpdate = function (responsible) { return __awaiter(void 0, void 0, void 0, function () {
        var user, userRepository, e_7;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    userRepository = (0, typeorm_1.getRepository)(user_1.User);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail({
                            where: { username: responsible },
                        })];
                case 2: return [2 /*return*/, (user = _b.sent())];
                case 3:
                    e_7 = _b.sent();
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return TaskController;
}());
exports.TaskController = TaskController;
exports.default = TaskController;
//# sourceMappingURL=task-controller.js.map