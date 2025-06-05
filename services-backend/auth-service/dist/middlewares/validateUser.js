import { body, validationResult } from "express-validator";
const validationRules = ({ login, updateProfile }) => {
    if (login) {
        return [
            body("email").isEmail().withMessage("Invalid email"),
            body("password")
                .isLength({ min: 8 })
                .withMessage("Password must have minimum of 8 characters"),
        ];
    }
    if (updateProfile) {
        return [
            body("email").optional().isEmail().withMessage("Invalid email"),
            body("username")
                .optional()
                .notEmpty()
                .withMessage("Username is required"),
            body("password")
                .optional()
                .isLength({ min: 8 })
                .withMessage("Password must have a minimum of 8 characters"),
            body("phone")
                .optional()
                .isMobilePhone("any")
                .withMessage("Invalid phone number format"),
        ];
    }
    return [
        body("email").isEmail().withMessage("Invalid email"),
        body("username").isString().notEmpty().withMessage("username required"),
        body("password")
            .isString()
            .isLength({ min: 8 })
            .withMessage("Password must have minimum of 8 characters"),
        body("phone")
            .isMobilePhone("any")
            .withMessage("Invalid phone number format"),
    ];
};
const validate = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error });
    }
    next();
};
export { validationRules, validate };
