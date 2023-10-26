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
exports.verifyAndDeleteOTP = exports.generateAndSaveOTP = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const log_event_1 = __importDefault(require("../../helpers/log-event"));
const otp_model_1 = __importDefault(require("../../models/auth/otp.model"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const logging_1 = __importDefault(require("../../utils/logging"));
const timer_1 = require("../../utils/timer");
const NAMESPACE = 'services/otp';
const generateAndSaveOTP = (emailCheck) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Generate otp code..
        const otpGenerated = otp_generator_1.default
            .generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
            .toString();
        // Hash otp code..
        const salt = yield bcrypt_1.default.genSalt(10);
        const otpHashed = yield bcrypt_1.default.hash(otpGenerated, salt);
        const expiryDate = (0, timer_1.createExpiryDate)().toISOString();
        const otpFind = yield otp_model_1.default.findOne({ where: { email: emailCheck } });
        if (otpFind) {
            if ((0, timer_1.isExpiredDate)(new Date(otpFind.dataValues.expiryDate))) {
                // Resend otp
                otpFind.set(Object.assign(Object.assign({}, otpFind), { otp: otpHashed, expiryDate: expiryDate }));
                yield otpFind.save();
                return {
                    status: 200,
                    message: 'OTP has been regenerated!',
                    data: otpFind
                };
            }
            else {
                return {
                    status: 400,
                    message: 'The otp code is still available'
                };
            }
        }
        else {
            // Generate new
            // Insert otp to database..
            const userFind = yield user_model_1.default.findOne({ where: { email: emailCheck } });
            if (userFind) {
                if (userFind.dataValues.isTemp === false) {
                    return {
                        status: 400,
                        message: `${emailCheck} is already registered!`
                    };
                }
                else {
                    const newOtp = yield otp_model_1.default.create({ email: emailCheck, otp: otpHashed, expiryDate: expiryDate });
                    return {
                        status: newOtp ? 200 : 400,
                        message: newOtp ? 'Otp has been generated!' : 'There was a problem saving the otp code!',
                        data: newOtp,
                        meta: userFind
                    };
                }
            }
            else {
                return {
                    status: 404,
                    message: `${emailCheck} is not found!`
                };
            }
        }
    }
    catch (e) {
        (0, log_event_1.default)(`${e}`);
        logging_1.default.error(NAMESPACE, `${e}`);
        throw new Error(`${e}`);
    }
});
exports.generateAndSaveOTP = generateAndSaveOTP;
// Get all
const verifyAndDeleteOTP = (emailCheck, otpCheck) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const otpFind = yield otp_model_1.default.findOne({
            where: {
                email: emailCheck,
                otp: otpCheck
            }
        });
        const userFind = yield user_model_1.default.findOne({ where: { email: emailCheck } });
        if (otpFind) {
            if ((0, timer_1.isExpiredDate)(new Date(otpFind.dataValues.expiryDate))) {
                return {
                    status: 408,
                    message: 'Your OTP code has expired, please resend the OTP code'
                };
            }
            else {
                if (userFind) {
                    // await updateUserByEmail({ ...userFind, isTemp: false })
                    userFind.set(Object.assign(Object.assign({}, userFind), { role: 'user', isTemp: false }));
                    yield userFind.save();
                }
                yield otpFind.destroy();
                return {
                    status: 200,
                    message: 'OTP has been verified!'
                };
            }
        }
        else {
            if (userFind) {
                if (userFind.dataValues.isTemp === false) {
                    return {
                        status: 400,
                        message: `${emailCheck} is already registered!`
                    };
                }
                else {
                    return {
                        status: 400,
                        message: 'Please send otp code for user authentication'
                    };
                }
            }
            else {
                return {
                    status: 404,
                    message: `Can not find otp and ${emailCheck}`
                };
            }
        }
    }
    catch (e) {
        logging_1.default.error(NAMESPACE, `${e}`);
        (0, log_event_1.default)(`${e}`);
        throw new Error(`${e}`);
    }
});
exports.verifyAndDeleteOTP = verifyAndDeleteOTP;
