import { Request, Response } from "express";
import { db } from "../database/dbConfig";

const saveLog = async (req: Request, res: Response) => {
  const newLog = req.body;
  try {
    const saved = await db.logs.create(newLog);
    console.log(saved);
    if (saved) {
      res.status(200).json({ message: "Event logged successfully" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { saveLog };
