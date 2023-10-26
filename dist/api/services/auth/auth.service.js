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
exports.registerUser = exports.loginUser = void 0;
/* eslint-disable no-unreachable */
const bcrypt_1 = __importDefault(require("bcrypt"));
const log_event_1 = __importDefault(require("../../helpers/log-event"));
const otp_model_1 = __importDefault(require("../../models/auth/otp.model"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const otp_service_1 = require("../auth/otp.service");
const logging_1 = __importDefault(require("../../utils/logging"));
const timer_1 = require("../../utils/timer");
const NAMESPACE = 'services/auth';
const loginUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            status: 0,
            message: '',
            data: user
        };
    }
    catch (error) {
        (0, log_event_1.default)(`${error}`);
        logging_1.default.error(NAMESPACE, `${error}`);
        throw Error(`${error}`);
    }
});
exports.loginUser = loginUser;
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFind = yield user_model_1.default.findOne({ where: { email: user.email } });
        const otpFind = yield otp_model_1.default.findOne({ where: { email: user.email } });
        if (userFind) {
            if (userFind.dataValues.isTemp) {
                if (otpFind) {
                    if ((0, timer_1.isExpiredDate)(new Date(otpFind.dataValues.expiryDate))) {
                        return {
                            status: 400,
                            message: 'The otp code has expired, please resend the otp code'
                        };
                    }
                    else {
                        return {
                            status: 400,
                            message: 'Please verify otp code..'
                        };
                    }
                }
                else {
                    return {
                        status: 400,
                        message: 'Please resend and verify otp code..'
                    };
                }
            }
            else {
                return {
                    status: 400,
                    message: `${user.email} is already registered`
                };
            }
        }
        else {
            const salt = yield bcrypt_1.default.genSalt(10);
            const passwordHashed = yield bcrypt_1.default.hash(user.password, salt);
            const userTemp = yield user_model_1.default.create(Object.assign(Object.assign({}, user), { password: passwordHashed, isTemp: true }));
            const otpGenerated = yield (0, otp_service_1.generateAndSaveOTP)(user.email);
            return {
                status: 200,
                message: `We have sent the otp code to ${user.email} please check your mailbox!`,
                data: otpGenerated.data,
                meta: userTemp
            };
        }
    }
    catch (error) {
        (0, log_event_1.default)(`${error}`);
        logging_1.default.error(NAMESPACE, `${error}`);
        throw Error(`${error}`);
    }
});
exports.registerUser = registerUser;
