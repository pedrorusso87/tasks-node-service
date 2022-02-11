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
exports.StatusController = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var status_1 = require("../entity/status");
var StatusController = /** @class */ (function () {
    function StatusController() {
    }
    var _a;
    _a = StatusController;
    StatusController.getAll = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var statusRepository, statuses, e_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    statusRepository = (0, typeorm_1.getRepository)(status_1.Status);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, statusRepository.find()];
                case 2:
                    statuses = _b.sent();
                    if (statuses.length > 0) {
                        response.send(statuses);
                    }
                    else {
                        return [2 /*return*/, response.status(404).json({ message: "No statuses found." })];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    console.log(response);
                    return [2 /*return*/, response.status(500).json({
                            message: "There was an error in the application.",
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    StatusController.modifyStatus = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var id, description, statusRepository, status, e_2, errors, e_3;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    id = request.params.id;
                    description = request.body.description;
                    statusRepository = (0, typeorm_1.getRepository)(status_1.Status);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, statusRepository.findOneOrFail(id)];
                case 2:
                    status = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _b.sent();
                    return [2 /*return*/, response.status(404).json({
                            message: "Status not found.",
                        })];
                case 4:
                    status.description = description;
                    return [4 /*yield*/, (0, class_validator_1.validate)(status)];
                case 5:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, response.status(400).json(errors)];
                    }
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, statusRepository.save(status)];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_3 = _b.sent();
                    return [2 /*return*/, response.status(409).json({
                            message: "Status already exists.",
                        })];
                case 9:
                    response.status(201).json({
                        message: "Status updated.",
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    StatusController.addStatus = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var statusRepository, description, status, errors, e_4;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    statusRepository = (0, typeorm_1.getRepository)(status_1.Status);
                    description = request.body.description;
                    status = new status_1.Status();
                    status.description = description;
                    return [4 /*yield*/, (0, class_validator_1.validate)(status)];
                case 1:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, response.status(400).json(errors)];
                    }
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, statusRepository.save(status)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_4 = _b.sent();
                    return [2 /*return*/, response.status(500).json({
                            message: "Error creating new status. " + e_4,
                        })];
                case 5:
                    response.status(201).json({ message: "Status created" });
                    return [2 /*return*/];
            }
        });
    }); };
    return StatusController;
}());
exports.StatusController = StatusController;
exports.default = StatusController;
//# sourceMappingURL=status-controller.js.map