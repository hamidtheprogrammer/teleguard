import cors from "cors";

import testRoute from "./routes/testRoute";
import userRouter from "./routes/userRoutes";
import cookieParser from "cookie-parser";
import { JwtPayload } from "jsonwebtoken";
import adminRouter from "./routes/adminRoutes";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import express from "express";
import { db } from "./database/dbConfig";
import https from "https";
import fs from "fs";

import rateLimit from "express-rate-limit";
import { encrypt } from "./utils/encryptData";

import dotenv from "dotenv";

const DATABASE_CONNECTION_KEY = process.env.DATABASE_URL;

const app = express();

// Configure rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

// app.use(limiter);

// Load self-signed certificate and key
const options = {
  key: fs.readFileSync("src/server.key"),
  cert: fs.readFileSync("src/server.crt"),
};

//Start HTTPS server
https.createServer(options, app).listen(3100, () => {
  console.log("HTTPS Server running on https://localhost:3100");
});

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

// app.listen(8000, () => {
//   console.log("SERVER UP!!!");
// });

// Encrypt the message
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
      username: "arthur",
      email: "arthur@gmail.com",
      password: "Hamidhamid1",
      phone: "320-456-7890",
      role: "DOCTOR",
      verified: true,
    },
    {
      id: "673351cc04bd2abf19d97635",
      username: "DrAliceSmith",
      email: "alicesmith@example.com",
      password: "password123",
      phone: "320-456-7890",
    },
    {
      id: "66e440d9a0c61196703cc8ea",
      username: "DrBobLane",
      email: "boblane@example.com",
      password: "securepass",
      phone: "321-567-8901",
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
      password: "mypassword",
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
  const patients = [
    {
      username: "patient1",
      email: "patient21@example.com",
      password: "patientpass1",
      phone: "325-123-4567",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient2",
      email: "patient22@example.com",
      password: "patientpass2",
      phone: "326-234-5678",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient3",
      email: "patient23@example.com",
      password: "patientpass3",
      phone: "327-345-6789",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient4",
      email: "patient24@example.com",
      password: "patientpass4",
      phone: "328-456-7890",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient5",
      email: "patient25@example.com",
      password: "patientpass5",
      phone: "329-567-8901",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient6",
      email: "patient26@example.com",
      password: "patientpass6",
      phone: "330-678-9012",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient7",
      email: "patient27@example.com",
      password: "patientpass7",
      phone: "331-789-0123",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient8",
      email: "patient28@example.com",
      password: "patientpass8",
      phone: "332-890-1234",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient9",
      email: "patient29@example.com",
      password: "patientpass9",
      phone: "333-123-4567",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient10",
      email: "patient210@example.com",
      password: "patientpass10",
      phone: "334-234-5678",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient11",
      email: "patient211@example.com",
      password: "patientpass11",
      phone: "335-345-6789",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient12",
      email: "patient212@example.com",
      password: "patientpass12",
      phone: "336-456-7890",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient13",
      email: "patient213@example.com",
      password: "patientpass13",
      phone: "337-567-8901",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient14",
      email: "patient214@example.com",
      password: "patientpass14",
      phone: "338-678-9012",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient15",
      email: "patient215@example.com",
      password: "patientpass15",
      phone: "339-789-0123",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient1",
      email: "patient31@example.com",
      password: "patientpass1",
      phone: "325-123-4567",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient2",
      email: "patient32@example.com",
      password: "patientpass2",
      phone: "326-234-5678",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient3",
      email: "patient33@example.com",
      password: "patientpass3",
      phone: "327-345-6789",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient4",
      email: "patient34@example.com",
      password: "patientpass4",
      phone: "328-456-7890",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient5",
      email: "patient35@example.com",
      password: "patientpass5",
      phone: "329-567-8901",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient6",
      email: "patient36@example.com",
      password: "patientpass6",
      phone: "330-678-9012",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient7",
      email: "patient37@example.com",
      password: "patientpass7",
      phone: "331-789-0123",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient8",
      email: "patient38@example.com",
      password: "patientpass8",
      phone: "332-890-1234",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient9",
      email: "patient39@example.com",
      password: "patientpass9",
      phone: "333-123-4567",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient10",
      email: "patient310@example.com",
      password: "patientpass10",
      phone: "334-234-5678",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient11",
      email: "patient311@example.com",
      password: "patientpass11",
      phone: "335-345-6789",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient12",
      email: "patient312@example.com",
      password: "patientpass12",
      phone: "336-456-7890",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient13",
      email: "patient313@example.com",
      password: "patientpass13",
      phone: "337-567-8901",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient14",
      email: "patient314@example.com",
      password: "patientpass14",
      phone: "338-678-9012",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient15",
      email: "patient315@example.com",
      password: "patientpass15",
      phone: "339-789-0123",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient1",
      email: "patient41@example.com",
      password: "patientpass1",
      phone: "325-123-4567",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient2",
      email: "patient42@example.com",
      password: "patientpass2",
      phone: "326-234-5678",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient3",
      email: "patient43@example.com",
      password: "patientpass3",
      phone: "327-345-6789",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient4",
      email: "patient44@example.com",
      password: "patientpass4",
      phone: "328-456-7890",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient5",
      email: "patient45@example.com",
      password: "patientpass5",
      phone: "329-567-8901",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient6",
      email: "patient46@example.com",
      password: "patientpass6",
      phone: "330-678-9012",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient7",
      email: "patient47@example.com",
      password: "patientpass7",
      phone: "331-789-0123",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient8",
      email: "patient48@example.com",
      password: "patientpass8",
      phone: "332-890-1234",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient9",
      email: "patient49@example.com",
      password: "patientpass9",
      phone: "333-123-4567",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient10",
      email: "patient410@example.com",
      password: "patientpass10",
      phone: "334-234-5678",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient11",
      email: "patient411@example.com",
      password: "patientpass11",
      phone: "335-345-6789",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient12",
      email: "patient412@example.com",
      password: "patientpass12",
      phone: "336-456-7890",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient13",
      email: "patient413@example.com",
      password: "patientpass13",
      phone: "337-567-8901",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient14",
      email: "patient414@example.com",
      password: "patientpass14",
      phone: "338-678-9012",
      role: "PATIENT",
      verified: true,
    },
    {
      username: "patient15",
      email: "patient415@example.com",
      password: "patientpass15",
      phone: "339-789-0123",
      role: "PATIENT",
      verified: true,
    },
  ];

  const preparedUsers = [];

  const salt = await bcrypt.genSalt(10);

  for (let i = 0; i < 2; i++) {
    const hashedPassword = await bcrypt.hash(`newUser${i}`, salt);

    const newUser = {
      username: encrypt(`newUser${i}`),
      email: encrypt(`newUser${i}.email`),
      password: hashedPassword,
      phone: encrypt(patients[1].phone),
      role: patients[1].role as Role,
      verified: true,
    };

    preparedUsers.push(newUser);
  }

  try {
    const count = await db.user.count();

    if (count > 30) {
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
      take: 6,
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
