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
const service = __importStar(require("../services/user.service"));
// Create new
const createNew = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRequest = {
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
        phone: req.body.phone,
        address: req.body.address,
        birthday: req.body.birthday,
        role: req.body.role,
        orderNumber: req.body.orderNumber
    };
    try {
        const newUser = yield service.createNew(userRequest);
        return res.formatter.dynamicFind(Object.assign({}, newUser));
    }
    catch (error) {
        return res.formatter.dynamicFind({ message: `${error}` });
    }
});
exports.createNew = createNew;
// Get by id
const getByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield service.getByID(parseInt(id));
        return res.formatter.dynamicFind(Object.assign({}, user));
    }
    catch (error) {
        return res.formatter.dynamicFind({ message: `${error}` });
    }
});
exports.getByID = getByID;
// Get all
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield service.getAll();
        return res.formatter.dynamicFind(Object.assign(Object.assign({}, users), { message: users.data.length }));
    }
    catch (error) {
        return res.formatter.dynamicFind({ message: `${error}` });
    }
});
exports.getAll = getAll;
// Update
const updateByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userRequest = {
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
        phone: req.body.phone,
        address: req.body.address,
        birthday: req.body.birthday,
        role: req.body.role,
        orderNumber: req.body.orderNumber
    };
    try {
        const user = yield service.updateByID(userRequest);
        return res.formatter.dynamicFind(user);
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
        const user = yield service.deleteByID(parseInt(id));
        return res.formatter.dynamicFind(user);
    }
    catch (error) {
        return res.formatter.dynamicFind({ message: `${error}` });
    }
});
exports.deleteByID = deleteByID;
