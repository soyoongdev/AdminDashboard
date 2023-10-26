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
const product_model_1 = __importDefault(require("./product.model"));
const user_model_1 = __importDefault(require("./user.model"));
const { INTEGER, STRING } = sequelize_typescript_1.DataType;
let FavoriteSchema = class FavoriteSchema extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: INTEGER, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], FavoriteSchema.prototype, "favoriteID", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_model_1.default, { foreignKey: 'productID' }),
    (0, sequelize_typescript_1.Column)({ type: INTEGER }),
    __metadata("design:type", Number)
], FavoriteSchema.prototype, "productID", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.default, { foreignKey: 'userID' }),
    (0, sequelize_typescript_1.Column)({ type: INTEGER }),
    __metadata("design:type", Number)
], FavoriteSchema.prototype, "userID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: INTEGER }),
    __metadata("design:type", Number)
], FavoriteSchema.prototype, "orderNumber", void 0);
FavoriteSchema = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: 'favorites',
        modelName: 'Favorite'
    })
], FavoriteSchema);
// FavoriteSchema.belongsTo(UserSchema, { foreignKey: 'userID' })
// FavoriteSchema.belongsTo(ProductSchema, { foreignKey: 'productID' })
exports.default = FavoriteSchema;
