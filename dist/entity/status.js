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
import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
var Status = /** @class */ (function () {
    function Status() {
    }
    __decorate([
        PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Status.prototype, "id", void 0);
    __decorate([
        Column(),
        IsNotEmpty(),
        __metadata("design:type", String)
    ], Status.prototype, "description", void 0);
    Status = __decorate([
        Entity(),
        Unique(["description"])
    ], Status);
    return Status;
}());
export { Status };
//# sourceMappingURL=status.js.map