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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteByUserID = exports.getAll = exports.getByUserID = exports.addToCart = void 0;
const NAMESPACE = 'controllers/cart';
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.formatter.dynamicFind({});
    }
    catch (error) {
        res.formatter.dynamicFind({ message: `${error}` });
    }
});
exports.addToCart = addToCart;
// Get by id
const getByUserID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        return res.formatter.dynamicFind({});
    }
    catch (error) {
        return res.formatter.dynamicFind({ message: `${error}` });
    }
});
exports.getByUserID = getByUserID;
// Get all
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.formatter.dynamicFind({});
    }
    catch (error) {
        return res.formatter.dynamicFind({ message: `${error}` });
    }
});
exports.getAll = getAll;
// Delete
const deleteByUserID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        return res.formatter.dynamicFind({});
    }
    catch (error) {
        return res.formatter.dynamicFind({ message: `${error}` });
    }
});
exports.deleteByUserID = deleteByUserID;
