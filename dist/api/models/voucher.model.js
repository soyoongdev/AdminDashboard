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
const sequelize_typescript_1 = require("sequelize-typescript");
const brand_model_1 = __importDefault(require("./brand.model"));
const voucher_type_model_1 = __importDefault(require("./voucher_type.model"));
const { INTEGER, STRING } = sequelize_typescript_1.DataType;
let VoucherSchema = class VoucherSchema extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: INTEGER, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], VoucherSchema.prototype, "voucherID", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => brand_model_1.default, { foreignKey: 'brandID' }),
    (0, sequelize_typescript_1.Column)({ type: INTEGER }),
    __metadata("design:type", Number)
], VoucherSchema.prototype, "brandID", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => voucher_type_model_1.default, { foreignKey: 'voucherTypeID' }),
    (0, sequelize_typescript_1.Column)({ type: INTEGER }),
    __metadata("design:type", Number)
], VoucherSchema.prototype, "voucherTypeID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: STRING }),
    __metadata("design:type", Number)
], VoucherSchema.prototype, "code", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: STRING }),
    __metadata("design:type", Number)
], VoucherSchema.prototype, "value", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: STRING }),
    __metadata("design:type", Number)
], VoucherSchema.prototype, "expiredDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: STRING }),
    __metadata("design:type", Number)
], VoucherSchema.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: STRING }),
    __metadata("design:type", Number)
], VoucherSchema.prototype, "desc", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: INTEGER }),
    __metadata("design:type", Number)
], VoucherSchema.prototype, "orderNumber", void 0);
VoucherSchema = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: 'vouchers',
        modelName: 'Voucher'
    })
], VoucherSchema);
// VoucherSchema.belongsTo(VoucherTypeSchema, { foreignKey: 'voucherTypeID' })
// VoucherSchema.belongsTo(BrandSchema, { foreignKey: 'brandID' })
exports.default = VoucherSchema;
