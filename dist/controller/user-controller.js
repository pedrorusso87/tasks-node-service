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
exports.UserController = void 0;
var typeorm_1 = require("typeorm");
var user_1 = require("../entity/user");
var class_validator_1 = require("class-validator");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    var _a;
    _a = UserController;
    UserController.getAll = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var userRepository, users, e_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    userRepository = (0, typeorm_1.getRepository)(user_1.User);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.find()];
                case 2:
                    users = _b.sent();
                    if (users.length > 0) {
                        response.send(users);
                    }
                    else {
                        return [2 /*return*/, response.status(404).json({ message: "No users found." })];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    return [2 /*return*/, response.status(500).json({
                            message: "There was an error in the application.",
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    UserController.getUserById = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var id, userRepository, user, e_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    id = request.params.id;
                    userRepository = (0, typeorm_1.getRepository)(user_1.User);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail(id)];
                case 2:
                    user = _b.sent();
                    response.send(user);
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _b.sent();
                    return [2 /*return*/, response.status(404).json({ message: "No user found." })];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    UserController.createUser = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, username, password, role, userRepository, user, errors, e_3;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = request.body, username = _b.username, password = _b.password, role = _b.role;
                    userRepository = (0, typeorm_1.getRepository)(user_1.User);
                    user = new user_1.User();
                    user.username = username;
                    user.password = password;
                    user.role = role;
                    return [4 /*yield*/, (0, class_validator_1.validate)(user)];
                case 1:
                    errors = _c.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, response.status(400).json(errors)];
                    }
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, userRepository.save(user)];
                case 3:
                    _c.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_3 = _c.sent();
                    return [2 /*return*/, response.status(409).json({
                            message: "Username already exists.",
                        })];
                case 5:
                    //If everything is ok
                    response.status(201).json({ message: "User created" });
                    return [2 /*return*/];
            }
        });
    }); };
    UserController.modifyUser = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var id, _b, username, role, userRepository, user, e_4, errors, e_5;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    id = request.params.id;
                    _b = request.body, username = _b.username, role = _b.role;
                    userRepository = (0, typeorm_1.getRepository)(user_1.User);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail(id)];
                case 2:
                    user = _c.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _c.sent();
                    return [2 /*return*/, response.status(404).json({
                            message: "User not found.",
                        })];
                case 4:
                    user.username = username;
                    user.role = role;
                    return [4 /*yield*/, (0, class_validator_1.validate)(user)];
                case 5:
                    errors = _c.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, response.status(400).json(errors)];
                    }
                    _c.label = 6;
                case 6:
                    _c.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, userRepository.save(user)];
                case 7:
                    _c.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_5 = _c.sent();
                    return [2 /*return*/, response.status(409).json({
                            message: "username already exists.",
                        })];
                case 9:
                    response.status(201).json({
                        message: "User updated.",
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    UserController.deleteUser = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var id, userRepository, user, e_6;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    id = request.params.id;
                    userRepository = (0, typeorm_1.getRepository)(user_1.User);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail(id)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_6 = _b.sent();
                    return [2 /*return*/, response.status(404).json({
                            message: "User not found.",
                        })];
                case 4: return [4 /*yield*/, userRepository.delete(id)];
                case 5:
                    _b.sent();
                    return [2 /*return*/, response.status(201).json({
                            message: "User deleted.",
                        })];
            }
        });
    }); };
    return UserController;
}());
exports.UserController = UserController;
exports.default = UserController;
//# sourceMappingURL=user-controller.js.map