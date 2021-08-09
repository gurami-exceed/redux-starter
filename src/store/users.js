import {createSlice} from "@reduxjs/toolkit";
let id = 0
const userSlice = createSlice({
	name: 'users',
	initialState: [],
	reducers: {
		userAdded: (state, action) => {
			state.push({
				id: ++id,
				name: action.payload.name
			})
		},
	}
})

export default userSlice.reducer
export const {userAdded} = userSlice.actions