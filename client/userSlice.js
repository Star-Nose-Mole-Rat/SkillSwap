import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  username: "",
  userId: "",
  displayName: "",
  skills: [],
  points: 0,
  videos: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addDisplayName: (state, action) => {
      state.displayName = action.payload;
    },
    addUser: (state, action) => {
      state.username = action.payload;
    },
    addUserId: (state, action) => {
      state.userId = action.payload;
    },
    addSkill: (state, action) => {
      state.skills.push(action.payload);
    },
    addVideo: (state, action) => {
      state.videos.push({url: action.payload});
    },
    addVideos: (state, action) => {
      action.payload.forEach((video) => state.videos.push(video));
    },
    addPoints: (state, action) => {
      state.points += action.payload;
    },
  },
});
export const {
  addUser,
  addDisplayName,
  addSkill,
  addVideo,
  addVideos,
  addPoints,
  addUserId,
} = userSlice.actions;
export default userSlice.reducer;
