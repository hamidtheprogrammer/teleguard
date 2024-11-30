var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { db } from "../database/dbConfig.js";
import { usersFilterBuilder } from "../utils/filterbuilders/usersFilterBuilder.js";
import { decrypt, encrypt } from "../utils/encryptData.js";
var Role;
(function (Role) {
  Role["ADMIN"] = "ADMIN";
  Role["DOCTOR"] = "DOCTOR";
  Role["PATIENT"] = "PATIENT";
  Role["USER"] = "USER";
})(Role || (Role = {}));
const getAllUsers = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userRole = req.user.role;
    let { query } = req;
    const documentLimit = 5;
    let skip;
    let total;
    let pageNumber = Number(query.pageNumber) || 1;
    let pages;
    skip = (pageNumber - 1) * documentLimit;
    let conditions = {
      skip,
      take: documentLimit,
      select: {
        id: true,
        username: true,
        verified: true,
        email: true,
        role: true,
      },
    };
    // if (userRole === Role.PATIENT) {
    //   conditions = {
    //     where: { role: "DOCTOR" },
    //     skip,
    //     select: {
    //       id: true,
    //       username: true,
    //       email: true,
    //       role: true,
    //       verified: true,
    //     },
    //   };
    // } else if (userRole === Role.DOCTOR) {
    //   conditions = {
    //     where: usersFilterBuilder(query),
    //     skip,
    //     take: documentLimit,
    //     select: {
    //       id: true,
    //       username: true,
    //       verified: true,
    //       email: true,
    //       role: true,
    //     },
    //   };
    // }
    try {
      const users = yield db.user.findMany(conditions);
      const decryptedUsers = [];
      for (let i = 0; i < users.length; i++) {
        const user = {
          id: users[i].id,
          username: decrypt(users[i].username),
          email: decrypt(users[i].email),
          verified: users[i].verified,
          role: users[i].role,
        };
        decryptedUsers.push(user);
      }
      total = yield db.user.count();
      pages = Math.ceil(total / documentLimit);
      const pagination = { pageNumber, total, count: users.length, pages };
      if (users) {
        res.status(200).json({ pagination, users: decryptedUsers });
      } else {
        res.status(401).json({ users: "No users found" });
      }
    } catch (error) {
      console.log(error);
    }
  });

const postAppointments = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let email = encrypt("arthur@gmail.com");
    try {
      const user = yield db.user.findFirst({
        where: { email: email },
        select: { id: true, username: true, password: true },
      });

      if (!user) {
        return res.status(401).json({ password: "post failed" });
      }
      user.username = decrypt(user.username);
      res.status(200).json({
        userId: user.id,
        username: user.username,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

const getUserById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // const { isAdmin } = req.user;
    // if (!isAdmin) {
    //   return res.status(401).json({ auth: "Not authorized" });
    // }
    try {
      const profile = yield db.user.findFirst({
        where: { id: id },
        select: {
          id: true,
          username: true,
          email: true,
          phone: true,
        },
      });
      if (profile) {
        res.status(200).json(profile);
      } else {
        res.status(401).json({ profile: "Could not get profile" });
      }
    } catch (error) {
      console.log(error);
    }
  });
// const forceDeleteUser = async (req: Request, res: Response) => {
//   const { userId } = req.body;
//   const { isAdmin } = req.user;
//   if (!isAdmin) {
//     return res.status(401).json({ auth: "Not authorized" });
//   }
//   try {
//     await userModel.findByIdAndDelete(userId);
//     res.status(200).json({ message: "Account deleted" });
//   } catch (error) {
//     console.log(error);
//   }
// };
// const addProduct = async (req: Request, res: Response) => {
//   if (!req.user.isAdmin)
//     return res.status(401).json({ message: "Unauthorized" });
//   const game = req.body;
//   const files = req.files as Express.Multer.File[];
//   try {
//     if (files) {
//       const uploadImages = files.map(async (image) => {
//         const b64 = Buffer.from(image.buffer).toString("base64");
//         let dataURI = "data:" + image.mimetype + ";base64," + b64;
//         const res = await cloudinary.v2.uploader.upload(dataURI);
//         return res.url;
//       });
//       const imageURLs = await Promise.all(uploadImages);
//       game.images = imageURLs;
//       const newgame = new productModel(game);
//       if (newgame) {
//         await newgame.save();
//         res.status(200).json(newgame);
//       } else {
//         res.status(400).json({ message: "Failed to save game" });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
// const deleteProduct = async (req: Request, res: Response) => {
//   const { productId } = req.params;
//   const { isAdmin } = req.user;
//   console.log(productId);
//   if (!isAdmin) {
//     return res.status(401).json({ auth: "Not authorized" });
//   }
//   try {
//     const deletedProduct = await productModel.findByIdAndDelete(productId);
//     if (!deletedProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.status(200).json({ message: "Product deleted" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
// const updateProduct = async (req: Request, res: Response) => {
//   if (!req.user.isAdmin)
//     return res.status(401).json({ message: "Not authorized" });
//   const newProduct = req.body;
//   const { productId } = req.params;
//   const files = req.files as Express.Multer.File[];
//   console.log(productId);
//   if (productId == null) {
//     return res.status(404).json({ message: "Id not provided" });
//   }
//   try {
//     if (files && files.length > 0) {
//       console.log(files.length);
//       const uploadImages = files.map(async (image) => {
//         const b64 = Buffer.from(image.buffer).toString("base64");
//         let dataURI = "data:" + image.mimetype + ";base64," + b64;
//         const res = await cloudinary.v2.uploader.upload(dataURI);
//         return res.url;
//       });
//       const imageURLs = await Promise.all(uploadImages);
//       if (newProduct.images && newProduct.images.length) {
//         newProduct.images.push(...imageURLs);
//       } else {
//         newProduct.images = imageURLs;
//       }
//     }
//     if (!newProduct.images || newProduct.images.length === 0) {
//       return res.status(404).json({ message: "Please attach images" });
//     }
//     if (req.body.reviews) {
//       newProduct.reviews = JSON.parse(req.body.reviews);
//     }
//     const updatedProduct = await productModel.findByIdAndUpdate(
//       productId,
//       newProduct,
//       { new: true }
//     );
//     if (updatedProduct) {
//       res.status(200).json(updatedProduct);
//     } else {
//       return res.status(404).json({ message: "Product update failed" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
export {
  getAllUsers,
  getUserById,
  postAppointments,
  //   forceDeleteUser,
  //   deleteProduct,
  //   updateProduct,
  //   addProduct,
};
