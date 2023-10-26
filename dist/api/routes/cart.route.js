"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controller = __importStar(require("../controllers/cart.controller"));
const request_validator_1 = require("../middleware/request-validator");
const router = (0, express_1.Router)();
// 'userID', 'status', 'products'
router.post('/', (0, request_validator_1.requestValidationRules)([
    (0, express_validator_1.body)('userID')
        .notEmpty()
        .withMessage('`userID` can not be empty!')
        .isInt()
        .withMessage('`userID` must be `integer` value type!'),
    (0, express_validator_1.body)('status')
        .notEmpty()
        .withMessage('`status` can not be empty!')
        .isString()
        .withMessage('`status` must be `string` value type!'),
    (0, express_validator_1.body)('products')
        .isArray()
        .withMessage('`products` là một mảng')
        .notEmpty()
        .withMessage('`products` can not be empty!')
]), controller.addToCart);
router.get('/find/:id', (0, request_validator_1.requestValidationRules)([
    (0, express_validator_1.body)('userID')
        .notEmpty()
        .withMessage('`userID` can not be empty!')
        .isInt()
        .withMessage('`userID` must be `integer` value type!')
]), controller.getByUserID);
router.get('/find', controller.getAll);
router.delete('/:id', (0, request_validator_1.requestValidationRules)([
    (0, express_validator_1.body)('userID')
        .notEmpty()
        .withMessage('`userID` can not be empty!')
        .isInt()
        .withMessage('`userID` must be `integer` value type!')
]), controller.deleteByUserID);
exports.default = router;
