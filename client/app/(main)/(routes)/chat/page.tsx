"use client";
import { store } from "@/app/redux/store";
import { Card } from "@/components/ui/card";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Phone } from "lucide-react";
import { Video } from "lucide-react";
import { useGetConversationsQuery } from "@/app/redux/services/chats";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat } from "@/app/redux/features/chat/chatSlice";

const conversations = [
  {
    id: "convo1",
    title: "Chat between Alice and Bob",
    participants: ["Alice", "Bob"],
    messages: [
      {
        id: "msg1",
        content: "Hi Bob!",
        timestamp: new Date(),
        senderId: "Alice",
        conversationId: "convo1",
      },
      {
        id: "msg2",
        content: "Hello Alice!",
        timestamp: new Date(),
        senderId: "Bob",
        conversationId: "convo1",
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "convo2",
    title: "Chat between Carol and Dave",
    participants: ["Carol", "Dave"],
    messages: [
      {
        id: "msg3",
        content: "Hi Dave!",
        timestamp: new Date(),
        senderId: "Carol",
        conversationId: "convo2",
      },
      {
        id: "msg4",
        content: "Hey Carol!",
        timestamp: new Date(),
        senderId: "Dave",
        conversationId: "convo2",
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "convo3",
    title: "Group Chat",
    participants: ["Eve", "Frank"],
    messages: [
      {
        id: "msg5",
        content: "Welcome to the group chat!",
        timestamp: new Date(),
        senderId: "Eve",
        conversationId: "convo3",
      },
      {
        id: "msg6",
        content: "Thanks, Eve!",
        timestamp: new Date(),
        senderId: "Frank",
        conversationId: "convo3",
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const ChatWrapper = () => {
  return (
    <Provider store={store}>
      <ChatPage />
    </Provider>
  );
};

const ChatPage = () => {
  const dispatch = useDispatch();
  const currentChat = useSelector((state: any) => {
    state.chats;
  });
  const { data, isLoading, isError } = useGetConversationsQuery("");

  const selectChat = (id: string) => {
    dispatch(setCurrentChat(id));
  };

  useEffect(() => {
    console.log(data);
  }, [data, isError]);

  useEffect(() => {
    console.log(currentChat);
  }, [currentChat]);

  return (
    <div className="px-1 h-full">
      <Card className="h-full flex w-full rounded-bl-none px-0">
        <div className="w-[33%] border-r-[2px] border-gray-300 h-full">
          <ul className="flex flex-col w-full h-full py-2">
            {data &&
              data.conversations &&
              data.conversations.length &&
              data.conversations.map((con: any) => (
                <li
                  onClick={() => selectChat(con.id)}
                  key={con.id}
                  className="hover:border-l-[4px] hover:border-blue-600 border-b-[1px] border-gray-300 py-4 px-4 text-sm flex justify-between items-start cursor-pointer"
                >
                  <div>
                    <h1 className="font-semibold">{"Dave"}</h1>
                    <p className="font-light">{"con.messages[1].content"}</p>
                  </div>
                  <div>sat</div>
                </li>
              ))}
          </ul>
        </div>
        <div className="flex-1 h-full flex flex-col">
          <div className="py-4 px-2 border-b-[1px] border-gray-300 flex justify-between">
            <div className=" flex flex-col">
              <span className="text-sm font-semibold">Frank</span>
              <span className="text-xs text-black/50">active 3h ago</span>
            </div>
            <div className="flex gap-4">
              <Card className="flex justify-center items-center w-9 h-9">
                <Video color="blue" size={20} fill="blue" />
              </Card>
              <Card className="flex justify-center items-center w-9 h-9">
                <Phone color="blue" size={20} fill="blue" />
              </Card>
            </div>
          </div>
          <div className="flex-1 flex flex-col py-3">
            <ul className="flex-1">h</ul>
            <form action="" className="flex px-1 h-fit">
              <input
                type="text"
                placeholder="Type your message"
                className="flex-1 text-sm font-light"
              />
              <button className="w-fit text-black/30 text-sm font-bold">
                Send
              </button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatWrapper;
