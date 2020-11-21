"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fallback = void 0;
// Intent name: Default Fallback Intent
exports.fallback = (conv) => {
    return conv.add(`Sorry, I didn't get that.`);
};
