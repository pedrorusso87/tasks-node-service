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
exports.User = void 0;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var task_1 = require("./task");
var dashboard_1 = require("./dashboard");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        (0, typeorm_1.Column)({ select: false }),
        (0, class_validator_1.MinLength)(6),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], User.prototype, "role", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, typeorm_1.CreateDateColumn)({ select: false, name: "created_date" }),
        __metadata("design:type", Date)
    ], User.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, typeorm_1.UpdateDateColumn)({ select: false, name: "updated_date" }),
        __metadata("design:type", Date)
    ], User.prototype, "modifiedDate", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return task_1.Task; }, function (task) { return task.responsible; }),
        __metadata("design:type", Array)
    ], User.prototype, "tasks", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return dashboard_1.Dashboard; }, function (dashboard) { return dashboard.owner; }),
        __metadata("design:type", Array)
    ], User.prototype, "dashboardList", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)(),
        (0, typeorm_1.Unique)(["username"])
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map