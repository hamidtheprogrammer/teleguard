import { createSlice } from "@reduxjs/toolkit";

// interface IconversationType {
//   participants?: String[];
//   messages?: {
//     content: String;
//     senderId: String;
//     conversationId: String;
//     timestamp: Date;
//   };
// }

const initialState: String | null = null;

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setCurrentChat } = chatSlice.actions;
export default chatSlice.reducer;
