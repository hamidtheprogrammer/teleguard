"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = exports.iv = exports.key = void 0;
const crypto_1 = __importDefault(require("crypto"));
// Generate a 32-byte (256-bit) key and a 16-byte IV
exports.key = Buffer.from(process.env.CRYPTOGRAPHY_KEY, "hex"); // 256 bits key for AES-256
exports.iv = Buffer.from(process.env.CRYPTOGRAPHY_IV, "hex"); // 128 bits IV for AES
// Encryption function
const encrypt = (text) => {
    const cipher = crypto_1.default.createCipheriv("aes-256-cbc", exports.key, exports.iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
};
exports.encrypt = encrypt;
// Decryption function
const decrypt = (encryptedText) => {
    const decipher = crypto_1.default.createDecipheriv("aes-256-cbc", exports.key, exports.iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};
exports.decrypt = decrypt;
