"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseEnhancer = void 0;
const methods_1 = __importDefault(require("./methods"));
const responseEnhancer = () => (_req, res, next) => {
    res.formatter = _generateFormatters(res);
    next();
};
exports.responseEnhancer = responseEnhancer;
const _generateFormatters = (res) => {
    const formatter = {};
    methods_1.default.map((method) => {
        formatter[method.type] = (response) => {
            if (method.type === 'dynamicFind') {
                const foundMethod = methods_1.default.find((m) => m.status === response.status);
                if (foundMethod) {
                    res.status(foundMethod.status).json({
                        status: foundMethod.status,
                        message: response.message ? response.message : foundMethod.message,
                        data: response.data,
                        meta: response.meta
                    });
                }
                else {
                    res.status(500).json({
                        status: 500,
                        message: 'Can not find the request status method!',
                        meta: res.statusCode
                    });
                }
            }
            else {
                res.status(method.status).json({
                    status: method.status,
                    message: response.message ? response.message : method.message,
                    data: response.data,
                    meta: response.meta
                });
            }
        };
    });
    return formatter;
};
