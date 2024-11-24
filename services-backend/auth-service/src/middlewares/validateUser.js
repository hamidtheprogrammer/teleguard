"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.validationRules = void 0;
const express_validator_1 = require("express-validator");
const validationRules = ({ login, updateProfile }) => {
    if (login) {
        return [
            (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"),
            (0, express_validator_1.body)("password")
                .isLength({ min: 8 })
                .withMessage("Password must have minimum of 8 characters"),
        ];
    }
    if (updateProfile) {
        return [
            (0, express_validator_1.body)("email").optional().isEmail().withMessage("Invalid email"),
            (0, express_validator_1.body)("username")
                .optional()
                .notEmpty()
                .withMessage("Username is required"),
            (0, express_validator_1.body)("password")
                .optional()
                .isLength({ min: 8 })
                .withMessage("Password must have a minimum of 8 characters"),
            (0, express_validator_1.body)("phone")
                .optional()
                .isMobilePhone("any")
                .withMessage("Invalid phone number format"),
        ];
    }
    return [
        (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"),
        (0, express_validator_1.body)("username").isString().notEmpty().withMessage("username required"),
        (0, express_validator_1.body)("password")
            .isString()
            .isLength({ min: 8 })
            .withMessage("Password must have minimum of 8 characters"),
        (0, express_validator_1.body)("phone")
            .isMobilePhone("any")
            .withMessage("Invalid phone number format"),
    ];
};
exports.validationRules = validationRules;
const validate = (req, res, next) => {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error });
    }
    next();
};
exports.validate = validate;
