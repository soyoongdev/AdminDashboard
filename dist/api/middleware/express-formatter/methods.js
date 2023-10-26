"use strict";
// Using this code or using library npm 'http-errors'
Object.defineProperty(exports, "__esModule", { value: true });
const methods = [
    {
        type: 'ok',
        status: 200,
        message: 'Ok'
    },
    {
        type: 'created',
        status: 201,
        message: 'Created'
    },
    {
        type: 'accepted',
        status: 202,
        message: 'Accepted'
    },
    {
        type: 'noContent',
        status: 204,
        message: 'No Content'
    },
    {
        type: 'badRequest',
        status: 400,
        message: 'Bad Request'
    },
    {
        type: 'unauthorized',
        status: 401,
        message: 'Unauthorized'
    },
    {
        type: 'forbidden',
        status: 403,
        message: 'Forbidden'
    },
    {
        type: 'notFound',
        status: 404,
        message: 'Not Found'
    },
    {
        type: 'methodNotAllowed',
        status: 405,
        message: 'Method not allowed!'
    },
    {
        type: 'timeout',
        status: 408,
        message: 'timeout'
    },
    {
        type: 'conflict',
        status: 409,
        message: 'Conflict'
    },
    {
        type: 'unprocessed',
        status: 422,
        message: 'Unprocessed'
    },
    {
        type: 'tooManyRequests',
        status: 429,
        message: 'Too many requests'
    },
    {
        type: 'serverError',
        status: 500,
        message: 'Server error'
    },
    {
        type: 'badGateway',
        status: 502,
        message: 'Bad Gateway'
    },
    {
        type: 'serviceUnavailable',
        status: 503,
        message: 'Service Unavailable'
    },
    {
        type: 'gatewayTimeout',
        status: 504,
        message: 'Gateway Timeout'
    },
    {
        type: 'dynamicFind',
        status: 0,
        message: 'Dynamic find'
    }
];
exports.default = methods;
