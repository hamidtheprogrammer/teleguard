import { validationResult, body } from "express-validator";
import { daysOfWeek, medicalSpecialties } from "../utils/constants";
import { Request, Response, NextFunction } from "express";

const doctorFormValidationRules = () => {
  return [
    body("specialty").custom((value) => {
      if (!medicalSpecialties.includes(value))
        throw new Error("Invalid input at specialty");
    }),
    body("medicalLicenseNumber")
      .isString()
      .isLength({ min: 8 })
      .withMessage("Invalid input at Medical license number"),
    body("yearsOfExperience")
      .isNumeric()
      .isLength({ min: 1 })
      .withMessage("Invalid input at Years of experience"),
    body("currentWorkplace").optional().isString(),
    body("description").isString(),
    body("availability")
      .isArray()
      .custom((value) => {
        if (
          value.forEach((element: string) => {
            !daysOfWeek.includes(element);
          })
        )
          throw new Error("Invalid day input");
      }),
  ];
};

const validateDoctorForm = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json(errors);
  }
  next();
};

export { validateDoctorForm, doctorFormValidationRules };
