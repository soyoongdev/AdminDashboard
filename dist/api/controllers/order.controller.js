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
exports.deleteByID = exports.updateByID = exports.getAll = exports.getByID = exports.createNew = void 0;
const services = __importStar(require("../services/order.service"));
const NAMESPACE = 'Order';
const createNew = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.formatter.dynamicFind({});
    }
    catch (error) {
        res.formatter.dynamicFind({ message: `${error}` });
    }
});
exports.createNew = createNew;
// Get by id
const getByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const order = yield services.getByID(parseInt(id));
        return res.formatter.dynamicFind(order);
    }
    catch (error) {
        return res.formatter.dynamicFind({ message: `${error}` });
    }
});
exports.getByID = getByID;
// Get all
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventories = yield services.getAll();
        return res.formatter.dynamicFind(inventories);
    }
    catch (error) {
        return res.formatter.dynamicFind({ message: `${error}` });
    }
});
exports.getAll = getAll;
// Update
const updateByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const orderFind = await services.updateByID(orderRequest)
        return res.formatter.dynamicFind({});
    }
    catch (error) {
        return res.formatter.dynamicFind({ message: `${error}` });
    }
});
exports.updateByID = updateByID;
// Delete
const deleteByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const orderFind = yield services.deleteByID(parseInt(id));
        return res.formatter.dynamicFind(orderFind);
    }
    catch (error) {
        return res.formatter.dynamicFind({ message: `${error}` });
    }
});
exports.deleteByID = deleteByID;
