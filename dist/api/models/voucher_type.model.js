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
const sequelize_typescript_1 = require("sequelize-typescript");
const { INTEGER, STRING } = sequelize_typescript_1.DataType;
let VoucherTypeSchema = class VoucherTypeSchema extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: INTEGER, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], VoucherTypeSchema.prototype, "voucherTypeID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: STRING }),
    __metadata("design:type", String)
], VoucherTypeSchema.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: STRING }),
    __metadata("design:type", String)
], VoucherTypeSchema.prototype, "desc", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: INTEGER }),
    __metadata("design:type", Number)
], VoucherTypeSchema.prototype, "orderNumber", void 0);
VoucherTypeSchema = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: 'transition_types',
        modelName: 'TransitionType'
    })
], VoucherTypeSchema);
exports.default = VoucherTypeSchema;
