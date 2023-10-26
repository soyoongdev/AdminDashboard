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
exports.deleteByID = exports.updateByID = exports.getAll = exports.getByID = exports.createNew = void 0;
const log_event_1 = __importDefault(require("../helpers/log-event"));
const user_model_1 = __importDefault(require("../models/user.model"));
const logging_1 = __importDefault(require("../utils/logging"));
const NAMESPACE = 'User';
const createNew = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const length = (yield user_model_1.default.findAll()).length;
        const userNew = yield user_model_1.default.create(Object.assign(Object.assign({}, user), { orderNumber: length }));
        return {
            status: userNew ? 200 : 400,
            message: userNew ? `${NAMESPACE} created successfully!` : `${NAMESPACE} create failed!`,
            data: userNew
        };
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, `${error}`);
        (0, log_event_1.default)(`${error}`);
        throw error;
    }
});
exports.createNew = createNew;
// Get by id
const getByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield user_model_1.default.findOne({ where: { userID: id } });
        return {
            status: product ? 200 : 404,
            message: product ? `${NAMESPACE} founded!` : `${NAMESPACE} not found!`,
            data: product
        };
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, `${error}`);
        (0, log_event_1.default)(`${error}`);
        throw error;
    }
});
exports.getByID = getByID;
// Get all
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield user_model_1.default.findAll();
        return {
            status: products ? 200 : 400,
            message: products ? `${NAMESPACE} founded!` : `${NAMESPACE} not found!`,
            data: products
        };
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, `${error}`);
        (0, log_event_1.default)(`${error}`);
        throw error;
    }
});
exports.getAll = getAll;
// Update
const updateByID = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFind = yield user_model_1.default.findByPk(user.userID);
        if (!userFind) {
            return {
                status: 400,
                message: `${NAMESPACE} not found!`
            };
        }
        else {
            userFind.set(user);
            const userSaved = yield userFind.save();
            return {
                status: userSaved ? 200 : 400,
                message: userSaved ? `${NAMESPACE} saved successfully!` : `${NAMESPACE} save failed!`,
                data: userSaved
            };
        }
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, `${error}`);
        (0, log_event_1.default)(`${error}`);
        throw error;
    }
});
exports.updateByID = updateByID;
// Delete
const deleteByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFind = yield user_model_1.default.findByPk(id);
        if (!userFind) {
            return {
                status: 404,
                message: `${NAMESPACE} not found!`
            };
        }
        else {
            return {
                status: 200,
                message: `${NAMESPACE} has been deleted!`,
                data: yield userFind.destroy()
            };
        }
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, `${error}`);
        (0, log_event_1.default)(`${error}`);
        throw error;
    }
});
exports.deleteByID = deleteByID;
