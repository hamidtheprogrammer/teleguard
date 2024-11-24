"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = ({ res, userId, isLoggedIn }) => {
    // secret key to verify integrity of hash
    const key = process.env.SECRET_KEY;
    //SIgn token using user's role and id
    const token = jsonwebtoken_1.default.sign({ userId, isLoggedIn }, key, {
        expiresIn: "30d",
    });
    //attach token to response cookie header
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 84000000,
    });
};
exports.default = createToken;
