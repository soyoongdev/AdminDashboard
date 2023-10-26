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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const brand_model_1 = __importDefault(require("./brand.model"));
const user_model_1 = __importDefault(require("./user.model"));
const { INTEGER, STRING, JSON } = sequelize_1.DataTypes;
let FollowerSchema = class FollowerSchema extends sequelize_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: INTEGER, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], FollowerSchema.prototype, "followerID", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => brand_model_1.default, { foreignKey: 'brandID' }),
    (0, sequelize_typescript_1.Column)({ type: INTEGER }),
    __metadata("design:type", Number)
], FollowerSchema.prototype, "brandID", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.default, { foreignKey: 'userID' }),
    (0, sequelize_typescript_1.Column)({ type: INTEGER }),
    __metadata("design:type", Number)
], FollowerSchema.prototype, "userID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: INTEGER }),
    __metadata("design:type", Number)
], FollowerSchema.prototype, "orderNumber", void 0);
FollowerSchema = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: 'followers',
        modelName: 'Follower'
    })
], FollowerSchema);
exports.default = FollowerSchema;
