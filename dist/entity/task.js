var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, ManyToOne, } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Status } from "./status";
import { Priority } from "./priority";
import { User } from "./user";
import { Dashboard } from "./dashboard";
var Task = /** @class */ (function () {
    function Task() {
    }
    __decorate([
        PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Task.prototype, "id", void 0);
    __decorate([
        ManyToOne(function () { return User; }, function (user) { return user.tasks; }),
        JoinColumn({ name: "responsible_id" }),
        __metadata("design:type", User)
    ], Task.prototype, "responsible", void 0);
    __decorate([
        ManyToOne(function () { return User; }, function (user) { return user.tasks; }),
        JoinColumn({ name: "created_by" }),
        __metadata("design:type", User)
    ], Task.prototype, "createdBy", void 0);
    __decorate([
        Column(),
        IsNotEmpty(),
        __metadata("design:type", String)
    ], Task.prototype, "description", void 0);
    __decorate([
        Column({ name: "due_date", nullable: true }),
        __metadata("design:type", Date)
    ], Task.prototype, "dueDate", void 0);
    __decorate([
        Column({ name: "created_date" }),
        CreateDateColumn(),
        __metadata("design:type", Date)
    ], Task.prototype, "createdDate", void 0);
    __decorate([
        ManyToOne(function () { return Status; }),
        JoinColumn({ name: "status_id" }),
        IsNotEmpty(),
        __metadata("design:type", Status)
    ], Task.prototype, "status", void 0);
    __decorate([
        ManyToOne(function () { return Priority; }),
        JoinColumn({ name: "priority_id" }),
        IsNotEmpty(),
        __metadata("design:type", Priority)
    ], Task.prototype, "priority", void 0);
    __decorate([
        ManyToOne(function () { return Dashboard; }),
        JoinColumn({ name: "dashboard_id" }),
        __metadata("design:type", Dashboard)
    ], Task.prototype, "dashboard", void 0);
    Task = __decorate([
        Entity("tasks")
    ], Task);
    return Task;
}());
export { Task };
//# sourceMappingURL=task.js.map