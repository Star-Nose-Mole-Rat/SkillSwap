import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  username: 'none',
	password: 'none',
	skills: [],
	points: 0,
	videos: [],
  };

  export const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addUser: (state, action) => {
			state.username = action.payload;
        },
		addSkill: (state, action) => {
			state.skills.push(action.payload);
			},
		addVideo: (state, action) => {
				state.videos.push(action.payload);
			},
		addToPoints: (state, action) => {
				state.points += action.payload;
			},
		}
  })
export const {addUser, addSkill, addVideo, addToPoints} = userSlice.actions;
export default userSlice.reducer;
