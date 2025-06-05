import { Request, Response } from "express";
import { db } from "../database/dbConfig";

const newConversation = async (req: Request, res: Response) => {
  const { senderId, receiverId } = req.body;
  try {
    const conversation = await db.conversation.create({
      data: {
        participants: [senderId, receiverId],
      },
    });

    return res.status(200).json({ conversation });
  } catch (error) {
    res.status(500).json({ message: "Internal server error. Pls try again" });
  }
};

const addNewMessage = async (req: Request, res: Response) => {
  const { senderId, conversationId } = req.body;
  try {
    const message = await db.message.create({
      data: {
        content: `Hello from participant 1 in conversation `,
        senderId: senderId,
        conversationId,
        timestamp: new Date(),
      },
    });

    return res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ message: "Internal server error. Pls try again" });
  }
};

const getConversations = async (req: Request, res: Response) => {
  const { userId } = req.user;
  try {
    const conversations = await db.conversation.findMany({
      where: {
        participants: { has: userId }, // Filter for conversations where the user is a participant
      },
      include: {
        messages: true, // Include messages for each conversation
      },
    });

    return res.status(200).json({ conversations });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal server error. Pls try againnn" });
  }
};

export { newConversation, addNewMessage, getConversations };
