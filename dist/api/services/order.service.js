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
const order_model_1 = __importDefault(require("../models/order.model"));
const logging_1 = __importDefault(require("../utils/logging"));
const NAMESPACE = 'Order';
const createNew = (order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const length = (yield order_model_1.default.findAll()).length;
        const cartNew = yield order_model_1.default.create(Object.assign(Object.assign({}, order), { orderNumber: length }));
        return {
            status: cartNew ? 200 : 400,
            message: cartNew ? `${NAMESPACE} created successfully!` : `${NAMESPACE} create failed!`,
            data: cartNew
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
        const order = yield order_model_1.default.findByPk(id);
        return {
            status: order ? 200 : 404,
            message: order ? `${NAMESPACE} founded!` : `${NAMESPACE} not found!`,
            data: order
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
        const carts = yield order_model_1.default.findAll();
        return {
            status: carts ? 200 : 400,
            message: carts ? `${NAMESPACE} founded!` : `${NAMESPACE} not found!`,
            data: carts
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
const updateByID = (order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartFind = yield order_model_1.default.findByPk(order.cart.cartID);
        if (!cartFind) {
            return {
                status: 400,
                message: `${NAMESPACE} not found!`
            };
        }
        else {
            cartFind.set(order);
            const cartSaved = yield cartFind.save();
            return {
                status: cartSaved ? 200 : 400,
                message: cartSaved ? `${NAMESPACE} saved successfully!` : `${NAMESPACE} save failed!`,
                data: cartSaved
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
        const cartFind = yield order_model_1.default.findByPk(id);
        if (!cartFind) {
            return {
                status: 404,
                message: `${NAMESPACE} not found!`
            };
        }
        else {
            return {
                status: 200,
                message: `${NAMESPACE} has been deleted!`,
                data: yield cartFind.destroy()
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
