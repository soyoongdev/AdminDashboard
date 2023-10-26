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
const { INTEGER, BOOLEAN, STRING } = sequelize_typescript_1.DataType;
let UserSchema = class UserSchema extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: INTEGER, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], UserSchema.prototype, "userID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: STRING, values: ['user', 'admin'] }),
    __metadata("design:type", String)
], UserSchema.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: STRING }),
    __metadata("design:type", String)
], UserSchema.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: STRING }),
    __metadata("design:type", String)
], UserSchema.prototype, "fullname", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: STRING }),
    __metadata("design:type", String)
], UserSchema.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: STRING }),
    __metadata("design:type", String)
], UserSchema.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: STRING }),
    __metadata("design:type", String)
], UserSchema.prototype, "avatar", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: STRING }),
    __metadata("design:type", String)
], UserSchema.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: STRING }),
    __metadata("design:type", String)
], UserSchema.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: STRING }),
    __metadata("design:type", String)
], UserSchema.prototype, "birthday", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: INTEGER }),
    __metadata("design:type", Number)
], UserSchema.prototype, "orderNumber", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: BOOLEAN }),
    __metadata("design:type", Boolean)
], UserSchema.prototype, "isTemp", void 0);
UserSchema = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: 'users',
        modelName: 'User'
    })
], UserSchema);
// UserSchema.addHook('beforeSave', (self) => {})
// UserSchema.hasMany(CartSchema, { foreignKey: 'userID' })
// UserSchema.hasMany(FavoriteSchema, { foreignKey: 'userID' })
// UserSchema.hasMany(RateSchema, { foreignKey: 'userID' })
// UserSchema.hasMany(FollowerSchema, { foreignKey: 'userID' })
// UserSchema.hasMany(TransitionSchema, { foreignKey: 'userID' })
// UserSchema.hasMany(ReservationSchema, { foreignKey: 'userID' })
exports.default = UserSchema;
