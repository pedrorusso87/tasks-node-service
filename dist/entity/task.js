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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var status_1 = require("./status");
var priority_1 = require("./priority");
var user_1 = require("./user");
var dashboard_1 = require("./dashboard");
var Task = /** @class */ (function () {
    function Task() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Task.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.tasks; }),
        (0, typeorm_1.JoinColumn)({ name: "responsible_id" }),
        __metadata("design:type", user_1.User)
    ], Task.prototype, "responsible", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.tasks; }),
        (0, typeorm_1.JoinColumn)({ name: "created_by" }),
        __metadata("design:type", user_1.User)
    ], Task.prototype, "createdBy", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], Task.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: "due_date", nullable: true }),
        __metadata("design:type", Date)
    ], Task.prototype, "dueDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: "created_date" }),
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Task.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return status_1.Status; }),
        (0, typeorm_1.JoinColumn)({ name: "status_id" }),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", status_1.Status)
    ], Task.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return priority_1.Priority; }),
        (0, typeorm_1.JoinColumn)({ name: "priority_id" }),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", priority_1.Priority)
    ], Task.prototype, "priority", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return dashboard_1.Dashboard; }),
        (0, typeorm_1.JoinColumn)({ name: "dashboard_id" }),
        __metadata("design:type", dashboard_1.Dashboard)
    ], Task.prototype, "dashboard", void 0);
    Task = __decorate([
        (0, typeorm_1.Entity)("tasks")
    ], Task);
    return Task;
}());
exports.Task = Task;
//# sourceMappingURL=task.js.map