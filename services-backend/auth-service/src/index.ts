import cors from "cors";
import dotenv from "dotenv";
import testRoute from "./routes/testRoute";
import userRouter from "./routes/userRoutes";
import cookieParser from "cookie-parser";
import { JwtPayload } from "jsonwebtoken";
import adminRouter from "./routes/adminRoutes";
import { Role, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import express from "express";
import { encrypt, decrypt } from "./utils/encryptData";
import { db } from "./database/dbConfig";
// import https from "https";
// import fs from "fs";

const app = express();

// // Load self-signed certificate and key
// const options = {
//   key: fs.readFileSync("src/server.key"),
//   cert: fs.readFileSync("src/server.crt"),
// };

// // Start HTTPS server
// https.createServer(options, app).listen(3100, () => {
//   console.log("HTTPS Server running on https://localhost:3100");
// });

// app.get("/test", (req, res) => res.send("Hello Secure World!"));

export interface decodedType extends JwtPayload {
  userId: string;
  username: string;
  role: Role;
}

declare global {
  namespace Express {
    interface Request {
      user: decodedType;
    }
  }
}

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use(testRoute);
app.use(userRouter);
app.use(adminRouter);

app.listen(8000, () => {
  console.log("SERVER UP!!!");
});

// const message = "Hey, see if you can encrypt me.";

// // Encrypt the message
// const encryptedMessage = encrypt(message);
// console.log("Encrypted:", encryptedMessage);

// // Decrypt the message
// const decryptedMessage = decrypt(encryptedMessage);
// console.log("Decrypted:", decryptedMessage);

// const password = "d-i-ff-i22225"; //plain text

// const hash = async () => {
//   const salt = await bcrypt.genSalt(10); //generate salt

//   const hashedValue = await bcrypt.hash(password, salt); // hash and mix

//   const verifyPassword = await bcrypt.compare(password, hashedValue); // verify the hash

//   verifyPassword
//     ? console.log("Password verified successfully")
//     : console.log("Password verification failed");
// };

// hash();

async function fillDB() {
  const users = [
    {
      username: "DrAliceSmith",
      email: "alicesmith@example.com",
      password:
        "password123   $2a$10$3oauEpwGzIFsRm/DAsvSGe7jAi5mFSYqihFaJdbndlEU9g47Ip8HO",
      phone: "320-456-7890",
      role: "DOCTOR",
      verified: true,
    },
    {
      username: "DrBobLane",
      email: "boblane@example.com",
      password:
        "securepass   $2a$10$3oauEpwGzIFsRm/DAsvSGe8kDThRBdIC4dMIWro4Ov4cRzgga/y0a",
      phone: "321-567-8901",
      role: "DOCTOR",
      verified: true,
    },
    {
      username: "DrCarolAdams",
      email: "caroladams@example.com",
      password: "doctorpass",
      phone: "322-678-9012",
      role: "DOCTOR",
      verified: true,
    },
    {
      username: "DrDavidRussell",
      email: "davidrussell@example.com",
      password:
        "mypassword   $2a$10$3oauEpwGzIFsRm/DAsvSGe2sNSBPMv8Af6rTALWVJNs3LJBTd4UuO",
      phone: "323-789-0123",
      role: "DOCTOR",
      verified: true,
    },
    {
      username: "DrEmmaBrooks",
      email: "emmabrooks@example.com",
      password: "brooks123",
      phone: "324-890-1234",
      role: "DOCTOR",
      verified: true,
    },
    {
      username: "patient1",
      email: "patient1@example.com",
      password: "patientpass1",
      phone: "325-123-4567",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient2",
      email: "patient2@example.com",
      password: "patientpass2",
      phone: "326-234-5678",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient3",
      email: "patient3@example.com",
      password: "patientpass3",
      phone: "327-345-6789",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient4",
      email: "patient4@example.com",
      password: "patientpass4",
      phone: "328-456-7890",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient5",
      email: "patient5@example.com",
      password: "patientpass5",
      phone: "329-567-8901",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient6",
      email: "patient6@example.com",
      password: "patientpass6",
      phone: "330-678-9012",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient7",
      email: "patient7@example.com",
      password: "patientpass7",
      phone: "331-789-0123",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient8",
      email: "patient8@example.com",
      password: "patientpass8",
      phone: "332-890-1234",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient9",
      email: "patient9@example.com",
      password: "patientpass9",
      phone: "333-123-4567",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient10",
      email: "patient10@example.com",
      password: "patientpass10",
      phone: "334-234-5678",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient11",
      email: "patient11@example.com",
      password: "patientpass11",
      phone: "335-345-6789",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient12",
      email: "patient12@example.com",
      password: "patientpass12",
      phone: "336-456-7890",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient13",
      email: "patient13@example.com",
      password: "patientpass13",
      phone: "337-567-8901",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient14",
      email: "patient14@example.com",
      password: "patientpass14",
      phone: "338-678-9012",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient15",
      email: "patient15@example.com",
      password: "patientpass15",
      phone: "339-789-0123",
      role: "PATIENT",
      verified: true,
    },
  ];

  const preparedUsers = [];

  const salt = await bcrypt.genSalt(10);

  for (let i = 0; i < users.length; i++) {
    const hashedPassword = await bcrypt.hash(users[i].password, salt);

    const newUser = {
      username: encrypt(users[i].username),
      email: encrypt(users[i].email),
      password: hashedPassword,
      phone: encrypt(users[i].phone),
      role: users[i].role as Role,
      verified: true,
    };

    preparedUsers.push(newUser);
  }

  try {
    const count = await db.user.count();

    if (count > 3) {
      return;
    }

    const saved = await db.user.createMany({ data: preparedUsers });
    console.log(saved);
  } catch (error) {
    console.log(error);
  }
}

async function getEncryptedData() {
  try {
    const data = await db.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        phone: true,
      },
      take: 5,
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}