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
const category_model_1 = __importDefault(require("./category.model"));
const inventory_model_1 = __importDefault(require("./inventory.model"));
const { INTEGER, STRING, JSON } = sequelize_typescript_1.DataType;
let ProductSchema = class ProductSchema extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: INTEGER, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], ProductSchema.prototype, "productID", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => category_model_1.default, { foreignKey: 'categoryID' }),
    (0, sequelize_typescript_1.Column)({ type: INTEGER }),
    __metadata("design:type", Number)
], ProductSchema.prototype, "categoryID", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => inventory_model_1.default, { foreignKey: 'inventoryID' }),
    (0, sequelize_typescript_1.Column)({ type: INTEGER }),
    __metadata("design:type", Number)
], ProductSchema.prototype, "inventoryID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: STRING }),
    __metadata("design:type", String)
], ProductSchema.prototype, "code", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: STRING }),
    __metadata("design:type", String)
], ProductSchema.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: STRING }),
    __metadata("design:type", String)
], ProductSchema.prototype, "desc", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: STRING }),
    __metadata("design:type", String)
], ProductSchema.prototype, "releaseDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: INTEGER }),
    __metadata("design:type", Number)
], ProductSchema.prototype, "orderNumber", void 0);
ProductSchema = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: 'products',
        modelName: 'Product'
    })
], ProductSchema);
// ProductSchema.belongsToMany(CartSchema, {
//   through: {
//     model: CartProductSchema
//   },
//   foreignKey: 'productID'
// })
// ProductSchema.hasMany(FavoriteSchema, { foreignKey: 'productID' })
// ProductSchema.hasMany(RateSchema, { foreignKey: 'productID' })
// ProductSchema.belongsTo(CategorySchema, { foreignKey: 'categoryID' })
// ProductSchema.belongsTo(InventorySchema, { foreignKey: 'inventoryID' })
exports.default = ProductSchema;
