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
const cart_model_1 = __importDefault(require("./cart.model"));
const transaction_model_1 = __importDefault(require("./transaction.model"));
const user_model_1 = __importDefault(require("./user.model"));
const { INTEGER, STRING, JSON } = sequelize_typescript_1.DataType;
let OrderSchema = class OrderSchema extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: INTEGER, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], OrderSchema.prototype, "orderID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: JSON }),
    __metadata("design:type", cart_model_1.default)
], OrderSchema.prototype, "cart", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: JSON }),
    __metadata("design:type", user_model_1.default)
], OrderSchema.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => transaction_model_1.default, { foreignKey: 'transitionID' }),
    (0, sequelize_typescript_1.Column)({ type: INTEGER }),
    __metadata("design:type", Number)
], OrderSchema.prototype, "transitionID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: JSON }),
    __metadata("design:type", Array)
], OrderSchema.prototype, "products", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: INTEGER }),
    __metadata("design:type", Number)
], OrderSchema.prototype, "orderNumber", void 0);
OrderSchema = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: 'orders',
        modelName: 'Order'
    })
], OrderSchema);
// OrderSchema.belongsTo(TransitionSchema, { foreignKey: 'transitionID' })
exports.default = OrderSchema;
