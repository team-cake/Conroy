"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcome = void 0;
// Intent name: Default Welcome Intent
exports.welcome = (conv) => {
    return conv.add(`Welcome, my name is Conroy.`);
};
