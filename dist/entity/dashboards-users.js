var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from "typeorm";
import { Dashboard } from "./dashboard";
import { User } from "./user";
var DashboardUser = /** @class */ (function () {
    // This table is for storing the dashboards per user
    function DashboardUser() {
    }
    __decorate([
        PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], DashboardUser.prototype, "id", void 0);
    __decorate([
        ManyToOne(function () { return User; }),
        JoinColumn({ name: "user_id" }),
        __metadata("design:type", User)
    ], DashboardUser.prototype, "user", void 0);
    __decorate([
        Column(),
        CreateDateColumn({ name: "created_date" }),
        __metadata("design:type", Date)
    ], DashboardUser.prototype, "createdDate", void 0);
    __decorate([
        Column(),
        UpdateDateColumn({ name: "updated_date" }),
        __metadata("design:type", Date)
    ], DashboardUser.prototype, "updatedDate", void 0);
    __decorate([
        ManyToOne(function () { return Dashboard; }),
        JoinColumn({ name: "dashboard_id" }),
        __metadata("design:type", Dashboard)
    ], DashboardUser.prototype, "dashboard", void 0);
    DashboardUser = __decorate([
        Entity("dashboards_users")
        // This table is for storing the dashboards per user
    ], DashboardUser);
    return DashboardUser;
}());
export { DashboardUser };
//# sourceMappingURL=dashboards-users.js.map