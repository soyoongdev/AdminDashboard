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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const controller = __importStar(require("../../controllers/auth/auth.controller"));
const request_validator_1 = require("../../middleware/request-validator");
const router = express_1.default.Router();
router.post('/login', (0, request_validator_1.requestValidationRules)([
    (0, express_validator_1.body)('username').not().isEmpty().withMessage('Username can not be empty'),
    (0, express_validator_1.body)('email').not().isEmpty().withMessage('Email can not be empty').isEmail().withMessage('Email is invalid'),
    (0, express_validator_1.body)('password').not().isEmpty().withMessage('Password can not be empty')
]), controller.login);
router.post('/register', (0, request_validator_1.requestValidationRules)([
    (0, express_validator_1.body)('username').not().isEmpty().withMessage('Username can not be empty'),
    (0, express_validator_1.body)('email').not().isEmpty().withMessage('Email can not be empty').isEmail().withMessage('Email is invalid'),
    (0, express_validator_1.body)('password').not().isEmpty().withMessage('Password can not be empty'),
    (0, express_validator_1.body)('roleID').not().isEmpty().withMessage('Role ID can not be empty')
]), controller.register);
router.post('/verify-otp', (0, request_validator_1.requestValidationRules)([
    (0, express_validator_1.body)('email').not().isEmpty().withMessage('Email can not be empty').isEmail().withMessage('Email is invalid'),
    (0, express_validator_1.body)('otp').not().isEmpty().withMessage('OTP can not be empty')
]), controller.verifyOTP);
router.post('/resend-otp', (0, request_validator_1.requestValidationRules)([
    (0, express_validator_1.body)('email').not().isEmpty().withMessage('Email can not be empty').isEmail().withMessage('Email is invalid')
]), controller.resendOTP);
exports.default = router;
