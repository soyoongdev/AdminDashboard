"use strict";
/* eslint-disable no-unused-vars */
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
exports.deleteByUserID = exports.getAll = exports.getByUserID = exports.updateCartByUserID = exports.addToCart = void 0;
const log_event_1 = __importDefault(require("../helpers/log-event"));
const cart_model_1 = __importDefault(require("../models/cart.model"));
const logging_1 = __importDefault(require("../utils/logging"));
const NAMESPACE = 'service/cart';
const addToCart = (cartInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield cart_model_1.default.create(cartInput);
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, `${error}`);
        (0, log_event_1.default)(`${NAMESPACE} :: ${error}`);
        throw new Error(`${NAMESPACE} :: ${error}`);
    }
});
exports.addToCart = addToCart;
// Update
const updateCartByUserID = (cartInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return { status: 200 };
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, `${error}`);
        (0, log_event_1.default)(`${NAMESPACE} :: ${error}`);
        throw new Error(`${NAMESPACE} :: ${error}`);
    }
});
exports.updateCartByUserID = updateCartByUserID;
// Get by id
const getByUserID = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield cart_model_1.default.findOne({ where: { userID: userID } });
        return cart;
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, `${error}`);
        (0, log_event_1.default)(`${NAMESPACE} :: ${error}`);
        throw new Error(`${NAMESPACE} :: ${error}`);
    }
});
exports.getByUserID = getByUserID;
// Get all
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carts = yield cart_model_1.default.findAll();
        return {
            status: carts ? 200 : 400,
            data: carts
        };
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, `${error}`);
        (0, log_event_1.default)(`${NAMESPACE} :: ${error}`);
        throw new Error(`${NAMESPACE} :: ${error}`);
    }
});
exports.getAll = getAll;
// Delete
const deleteByUserID = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartFind = yield cart_model_1.default.findOne({ where: { userID: userID } });
        if (!cartFind) {
            return {
                status: 404,
                message: `UserID: ${userID} not found!`
            };
        }
        else {
            return {
                status: 200,
                message: `UserID: ${userID} has been deleted!`,
                data: yield cartFind.destroy()
            };
        }
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, `${error}`);
        (0, log_event_1.default)(`${NAMESPACE} :: ${error}`);
        throw new Error(`${NAMESPACE} :: ${error}`);
    }
});
exports.deleteByUserID = deleteByUserID;
