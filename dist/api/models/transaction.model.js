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
const transition_type_model_1 = __importDefault(require("./transition_type.model"));
const user_model_1 = __importDefault(require("./user.model"));
const { INTEGER, STRING } = sequelize_typescript_1.DataType;
let TransitionSchema = class TransitionSchema extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: INTEGER, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], TransitionSchema.prototype, "transitionID", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.default, { foreignKey: 'userID' }),
    (0, sequelize_typescript_1.Column)({ type: INTEGER }),
    __metadata("design:type", Number)
], TransitionSchema.prototype, "userID", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => cart_model_1.default, { foreignKey: 'cartID' }),
    (0, sequelize_typescript_1.Column)({ type: INTEGER }),
    __metadata("design:type", Number)
], TransitionSchema.prototype, "cartID", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => transition_type_model_1.default, { foreignKey: 'transitionTypeID' }),
    (0, sequelize_typescript_1.Column)({ type: INTEGER }),
    __metadata("design:type", Number)
], TransitionSchema.prototype, "transitionTypeID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: INTEGER }),
    __metadata("design:type", Number)
], TransitionSchema.prototype, "amount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: INTEGER }),
    __metadata("design:type", Number)
], TransitionSchema.prototype, "orderNumber", void 0);
TransitionSchema = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: 'transitions',
        modelName: 'Transition'
    })
], TransitionSchema);
// TransitionSchema.belongsTo(UserSchema, { foreignKey: 'userID' })
// TransitionSchema.belongsTo(CartSchema, { foreignKey: 'cartID' })
// TransitionSchema.belongsTo(TransitionTypeSchema, { foreignKey: 'transitionTypeID' })
// TransitionSchema.hasOne(OrderSchema, { foreignKey: 'transitionID' })
exports.default = TransitionSchema;
