import { Router } from "express";
import {
  addNewMessage,
  getConversations,
  newConversation,
} from "../controllers/messageController";
import { authenticate } from "../middlewares/auth";

const messageRouter = Router();

messageRouter.route("/new-conversation").post(authenticate, newConversation);
messageRouter.route("/send-message").post(authenticate, addNewMessage);
messageRouter.route("/get-conversations").get(authenticate, getConversations);

export default messageRouter;
