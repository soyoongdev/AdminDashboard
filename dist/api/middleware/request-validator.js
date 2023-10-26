"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestValidationFields = exports.requestValidationRules = void 0;
const express_validator_1 = require("express-validator");
const requestValidationRules = (validationRules) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Áp dụng các quy tắc xác nhận cho từng trường
        yield Promise.all(validationRules.map((rule) => rule.run(req)));
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                message: 'Error validate request',
                data: null,
                meta: {
                    errors: errors.array()
                }
            });
        }
        next();
    });
};
exports.requestValidationRules = requestValidationRules;
const requestValidationFields = (fields, type = express_validator_1.body) => {
    const validationRules = fields.map((field) => type(field).notEmpty().withMessage(`${field} không được để trống`));
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Áp dụng các quy tắc xác nhận cho từng trường
        yield Promise.all(validationRules.map((rule) => rule.run(req)));
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                message: 'Error validate request',
                data: null,
                meta: {
                    errors: errors.array()
                }
            });
        }
        next();
    });
};
exports.requestValidationFields = requestValidationFields;
