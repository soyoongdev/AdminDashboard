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
exports.deleteByID = exports.updateByID = exports.getAll = exports.getByID = exports.createNew = void 0;
const NAMESPACE = 'Product';
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
        return res.formatter.dynamicFind({});
    }
    catch (error) {
        return res.formatter.dynamicFind({ message: `${error}` });
    }
});
exports.getByID = getByID;
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
// Update
const updateByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const productRequest = {
            productID: parseInt(id),
            name: req.body.name,
            categoryID: req.body.categoryID,
            inventoryID: req.body.inventoryID,
            code: req.body.code
        };
        return res.formatter.dynamicFind({});
    }
    catch (error) {
        return res.formatter.dynamicFind({ message: `${error}` });
    }
});
exports.updateByID = updateByID;
// Delete
const deleteByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        return res.formatter.dynamicFind({});
    }
    catch (error) {
        return res.formatter.dynamicFind({ message: `${error}` });
    }
});
exports.deleteByID = deleteByID;
