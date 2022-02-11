var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from "typeorm";
import { User } from "./user";
var Dashboard = /** @class */ (function () {
    function Dashboard() {
    }
    __decorate([
        PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Dashboard.prototype, "id", void 0);
    __decorate([
        Column(),
        IsNotEmpty(),
        __metadata("design:type", String)
    ], Dashboard.prototype, "name", void 0);
    __decorate([
        ManyToOne(function () { return User; }),
        JoinColumn({ name: "owner_id" }),
        __metadata("design:type", User)
    ], Dashboard.prototype, "owner", void 0);
    __decorate([
        Column(),
        CreateDateColumn(),
        __metadata("design:type", Date)
    ], Dashboard.prototype, "createdDate", void 0);
    __decorate([
        Column(),
        UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Dashboard.prototype, "modifiedDate", void 0);
    Dashboard = __decorate([
        Entity("dashboards")
    ], Dashboard);
    return Dashboard;
}());
export { Dashboard };
//# sourceMappingURL=dashboard.js.map