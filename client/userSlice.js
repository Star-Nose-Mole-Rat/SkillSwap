import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  	username: 'none',
	displayName: 'none',
	skills: [],
	points: 0,
	videos: [`how to solve for resistance, ohm\'s law`, 'how to play for Elise', 'how to make delicious coffee'] 
  };

  export const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addDisplayName: (state, action) => {
			state.displayName = action.payload;
		},
		addUser: (state, action) => {
			state.username = action.payload;
        },
		addSkill: (state, action) => {
			state.skills.push(action.payload);
			},
		addVideo: (state, action) => {
				state.videos.push(action.payload);
			},
		addVideos: (state, action) => {
			action.payload.forEach(video => state.videos.push(video))
		},
		addPoints: (state, action) => {
				state.points += action.payload;
			},
		}
  })
export const {addUser, addDisplayName, addSkill, addVideo, addVideos, addPoints} = userSlice.actions;
export default userSlice.reducer;
