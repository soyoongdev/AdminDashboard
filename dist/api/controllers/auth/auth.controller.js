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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendOTP = exports.verifyOTP = exports.register = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const sequelize_1 = require("sequelize");
const user_model_1 = __importDefault(require("../../models/user.model"));
const auth_service_1 = require("../../services/auth/auth.service");
const otp_service_1 = require("../../services/auth/otp.service");
const logging_1 = __importDefault(require("../../utils/logging"));
const NAMESPACE = 'controller/auth';
// Get by id
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const findUser = yield user_model_1.default.findOne({
            where: {
                [sequelize_1.Op.or]: [{ email: email || '' }, { username: username || '' }]
            }
        });
        if (findUser) {
            const matchedPassword = yield bcrypt_1.default.compare(password, findUser.dataValues.password);
            if (matchedPassword) {
                return res.formatter.ok({ message: 'Login success!', data: findUser });
            }
            else {
                return res.formatter.badRequest({ message: 'Login failed!' });
            }
        }
    }
    catch (error) {
        return res.formatter.badRequest({ message: `${error}` });
    }
});
exports.login = login;
// Get all
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRequest = {
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
        phone: req.body.phone,
        address: req.body.address,
        birthday: req.body.birthday,
        role: req.body.role,
        orderNumber: req.body.orderNumber
    };
    try {
        const register = yield (0, auth_service_1.registerUser)(userRequest);
        return res.formatter.dynamicFind(register);
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, `${error}`);
        return res.formatter.badRequest({ message: `${error}` });
    }
});
exports.register = register;
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    try {
        const result = yield (0, otp_service_1.verifyAndDeleteOTP)(email, otp);
        return res.formatter.dynamicFind(result);
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, `${error}`);
        return res.formatter.badRequest({ message: `${error}` });
    }
});
exports.verifyOTP = verifyOTP;
const resendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const result = yield (0, otp_service_1.generateAndSaveOTP)(email);
        return res.formatter.dynamicFind(result);
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, `${error}`);
        return res.formatter.badRequest({ message: `${error}` });
    }
});
exports.resendOTP = resendOTP;
