"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipe = void 0;
const pipe = (...fns) => {
    return (input) => {
        return fns.reduce((result, fn) => fn(result), input);
    };
};
exports.pipe = pipe;
