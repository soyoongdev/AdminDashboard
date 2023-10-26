"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const log_event_1 = __importDefault(require("../helpers/log-event"));
const auth_route_1 = __importDefault(require("./auth/auth.route"));
const cart_route_1 = __importDefault(require("./cart.route"));
const inventory_route_1 = __importDefault(require("./inventory.route"));
const order_route_1 = __importDefault(require("./order.route"));
const product_route_1 = __importDefault(require("./product.route"));
const user_route_1 = __importDefault(require("./user.route"));
const logging_1 = __importDefault(require("../utils/logging"));
const router = (0, express_1.Router)();
const NAMESPACE = 'routes/index';
router.use('/auth', auth_route_1.default);
router.use('/users', user_route_1.default);
router.use('/products', product_route_1.default);
router.use('/carts', cart_route_1.default);
router.use('/orders', order_route_1.default);
router.use('/inventories', inventory_route_1.default);
// eslint-disable-next-line no-unused-vars
router.use((err, _req, res, _next) => {
    (0, log_event_1.default)(err.message);
    logging_1.default.error(NAMESPACE, 'Not found with error: ' + err.message);
    return res.formatter.notFound({});
});
exports.default = router;
