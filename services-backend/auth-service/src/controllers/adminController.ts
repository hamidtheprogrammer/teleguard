import { db } from "../database/dbConfig";
import { Response, Request } from "express";
import { usersFilterBuilder } from "../utils/filterbuilders/usersFilterBuilder";

enum Role {
  ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
  USER = "USER",
}

const getAllUsers = async (req: Request, res: Response) => {
  const userRole = req.user.role;
  let { query } = req;

  const documentLimit = 3;
  let skip;
  let total;
  let pageNumber = Number(query.pageNumber) || 1;
  let pages;

  skip = (pageNumber - 1) * 3;

  let conditions: any;

  if (userRole === Role.PATIENT) {
    conditions = { where: { role: "DOCTOR" } };
  } else if (userRole === Role.DOCTOR) {
    conditions = {
      where: usersFilterBuilder(query),
      skip,
      take: documentLimit,
    };
  }
  try {
    const users = await db.user.findMany(conditions);

    total = await db.user.count();

    pages = Math.ceil(total / documentLimit);

    const pagination = { pageNumber, total, count: users.length, pages };

    if (users) {
      res.status(200).json({ pagination, users });
    } else {
      res.status(401).json({ users: "No users found" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getLogs = async (req: Request, res: Response) => {
  const { role } = req.user;

  if (role !== Role.ADMIN) {
    return res.status(401).json({ message: "Not authorized" });
  }
  try {
    const logs = await db.authLogs.findMany();

    if (logs) {
      res.status(200).json({ logs: logs });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  // const { isAdmin } = req.user;

  // if (!isAdmin) {
  //   return res.status(401).json({ auth: "Not authorized" });
  // }
  try {
    const profile = await db.user.findFirst({
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
};

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
  getLogs,
  getUserById,
  //   forceDeleteUser,
  //   deleteProduct,
  //   updateProduct,
  //   addProduct,
};
