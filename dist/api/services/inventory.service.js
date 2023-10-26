"use strict";
/* eslint-disable no-unreachable */
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
exports.deleteByID = exports.updateReservationItemByProductID = exports.updateByProductID = exports.getAll = exports.getByProductID = exports.getByID = exports.createNew = void 0;
const log_event_1 = __importDefault(require("../helpers/log-event"));
const inventory_model_1 = __importDefault(require("../models/inventory.model"));
const logging_1 = __importDefault(require("../utils/logging"));
const NAMESPACE = 'Inventory';
const createNew = (inventory) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventories = yield inventory_model_1.default.findAll();
        const inventoryNew = yield inventory_model_1.default.create(Object.assign(Object.assign({}, inventory), { orderNumber: inventories.length }));
        return {
            status: inventoryNew ? 200 : 400,
            data: inventoryNew
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
        const inventory = yield inventory_model_1.default.findByPk(id);
        return {
            status: inventory ? 200 : 404,
            data: inventory
        };
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, `${error}`);
        (0, log_event_1.default)(`${error}`);
        throw error;
    }
});
exports.getByID = getByID;
// Get by id
const getByProductID = (productID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventory = yield inventory_model_1.default.findOne({ where: { productID: productID } });
        return {
            status: inventory ? 200 : 404,
            data: inventory
        };
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, `${error}`);
        (0, log_event_1.default)(`${error}`);
        throw error;
    }
});
exports.getByProductID = getByProductID;
// Get all
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventories = yield inventory_model_1.default.findAll();
        return {
            status: inventories ? 200 : 400,
            data: inventories
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
const updateByProductID = (inventory) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventoryUpdated = yield inventory_model_1.default.update(inventory, { where: { productID: inventory.productID } });
        return {
            status: inventoryUpdated ? 200 : 400,
            data: inventoryUpdated
        };
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, `${error}`);
        (0, log_event_1.default)(`${error}`);
        throw error;
    }
});
exports.updateByProductID = updateByProductID;
const updateReservationItemByProductID = (productID, item) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _model = {};
        return _model;
    }
    catch (error) {
        throw Error(`${error}`);
    }
});
exports.updateReservationItemByProductID = updateReservationItemByProductID;
// Delete
const deleteByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.deleteByID = deleteByID;
