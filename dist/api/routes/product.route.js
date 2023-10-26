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
const controller = __importStar(require("../controllers/product.controller"));
const request_validator_1 = require("../middleware/request-validator");
const router = (0, express_1.Router)();
router.post('/', (0, request_validator_1.requestValidationRules)([
    (0, express_validator_1.body)('categoryID')
        .isInt()
        .withMessage('`categoryID` must be `integer` value type!')
        .notEmpty()
        .withMessage('`categoryID` can not be empty!'),
    (0, express_validator_1.body)('name')
        .notEmpty()
        .withMessage('`name` can not be empty!')
        .isString()
        .withMessage('`name` must be `string` value type!'),
    (0, express_validator_1.body)('images')
        .isArray()
        .withMessage('`images` must be `array` value type!')
        .notEmpty()
        .withMessage('`images` can not be empty!'),
    (0, express_validator_1.body)('name')
        .isString()
        .withMessage('`name` must be `string` value type!')
        .notEmpty()
        .withMessage('`name` can not be empty!'),
    (0, express_validator_1.body)('desc').isString().withMessage('`desc` must be `string` value type!')
]), controller.createNew);
router.get('/find/:id', controller.getByID);
router.get('/find', controller.getAll);
router.put('/:id', controller.updateByID);
router.delete('/:id', controller.deleteByID);
exports.default = router;
