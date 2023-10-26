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
exports.createExpiryDate = exports.getTimeRemaining = exports.isExpiredDate = exports.countdownTimer = void 0;
/* eslint-disable no-unused-vars */
const countdownTimer = (seconds) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, _reject) => {
        let remainingTime = seconds;
        const timer = setInterval(() => {
            if (remainingTime <= 0) {
                clearInterval(timer);
                resolve(true);
            }
            else {
                console.log(`Time remaining: ${remainingTime} seconds`);
                remainingTime--;
            }
        }, 1000);
    });
});
exports.countdownTimer = countdownTimer;
const isExpiredDate = (expiryDate) => {
    const currentTime = new Date();
    return currentTime >= expiryDate;
};
exports.isExpiredDate = isExpiredDate;
const getTimeRemaining = (expiryDateString) => {
    const currentTime = new Date();
    const expiryDate = new Date(expiryDateString);
    const timeRemaining = expiryDate.getTime() - currentTime.getTime(); // Số milliseconds còn lại
    // Chuyển đổi số milliseconds thành số giây
    const secondsRemaining = Math.floor(timeRemaining / 1000);
    return secondsRemaining;
};
exports.getTimeRemaining = getTimeRemaining;
// Tạo thời gian hết hạn 60 giây sau thời điểm hiện tại
const createExpiryDate = (seconds = 60) => {
    const currentTime = new Date();
    return new Date(currentTime.getTime() + seconds * 1000);
};
exports.createExpiryDate = createExpiryDate;
