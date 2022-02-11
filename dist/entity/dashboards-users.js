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
exports.DashboardUser = void 0;
var typeorm_1 = require("typeorm");
var dashboard_1 = require("./dashboard");
var user_1 = require("./user");
var DashboardUser = /** @class */ (function () {
    // This table is for storing the dashboards per user
    function DashboardUser() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], DashboardUser.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_1.User; }),
        (0, typeorm_1.JoinColumn)({ name: "user_id" }),
        __metadata("design:type", user_1.User)
    ], DashboardUser.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, typeorm_1.CreateDateColumn)({ name: "created_date" }),
        __metadata("design:type", Date)
    ], DashboardUser.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, typeorm_1.UpdateDateColumn)({ name: "updated_date" }),
        __metadata("design:type", Date)
    ], DashboardUser.prototype, "updatedDate", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return dashboard_1.Dashboard; }),
        (0, typeorm_1.JoinColumn)({ name: "dashboard_id" }),
        __metadata("design:type", dashboard_1.Dashboard)
    ], DashboardUser.prototype, "dashboard", void 0);
    DashboardUser = __decorate([
        (0, typeorm_1.Entity)("dashboards_users")
        // This table is for storing the dashboards per user
    ], DashboardUser);
    return DashboardUser;
}());
exports.DashboardUser = DashboardUser;
//# sourceMappingURL=dashboards-users.js.map