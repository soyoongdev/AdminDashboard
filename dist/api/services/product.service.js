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
exports.deleteByID = exports.updateByID = exports.getAll = exports.getByID = exports.createNew = void 0;
const log_event_1 = __importDefault(require("../helpers/log-event"));
const product_model_1 = __importDefault(require("../models/product.model"));
const logging_1 = __importDefault(require("../utils/logging"));
const NAMESPACE = 'Product';
const createNew = (productInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.create();
        product;
        return {
            status: 200
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
        const product = yield product_model_1.default.findByPk(id);
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
        const products = yield product_model_1.default.findAll();
        return {
            status: products ? 200 : 400,
            message: products ? `${NAMESPACE} founded!` : `${NAMESPACE} not found!`,
            data: products,
            meta: {
                total: products.length
            }
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
const updateByID = (product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            status: 200
        };
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
        const productFind = yield product_model_1.default.findByPk(id);
        if (!productFind) {
            return {
                status: 404,
                message: `${NAMESPACE} not found!`
            };
        }
        else {
            return {
                status: 200,
                message: `${NAMESPACE} has been deleted!`,
                data: yield productFind.destroy()
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
