import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/adminController";
import { authenticate } from "../middlewares/auth";

const adminRouter = Router();

adminRouter.route("/get-all-users").get(authenticate, getAllUsers);
adminRouter.route("/getUserById/:id").get(authenticate, getUserById);

// adminRouter.route("/get-profile-details").post(authenticate, getUserById);
// adminRouter.route("/force-delete-user").post(authenticate, forceDeleteUser);
// adminRouter
//   .route("/add-product")
//   .post(
//     authenticate,
//     productValidationRules({ update: false }),
//     productValidate,
//     upload.array("imageFiles", 2),
//     addProduct
//   );
// adminRouter
//   .route("/delete-product/:productId")
//   .delete(authenticate, deleteProduct);
// adminRouter
//   .route("/update-product/:productId")
//   .put(
//     authenticate,
//     productValidationRules({ update: true }),
//     productValidate,
//     upload.array("imageFiles", 2),
//     updateProduct
//   );

export default adminRouter;
