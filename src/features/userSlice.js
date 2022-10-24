import { createSlice } from '@reduxjs/toolkit';

export const userRegisterSlice = createSlice({
	name: 'user',
    initialState: {
        point: ''
    },
    reducers: {
        getPoint: (state, action) => {
            state.point = action.payload
        }
    }
});

// Action creators are generated for each case reducer function
export const { getPoint } = userRegisterSlice.actions;

export default userRegisterSlice.reducer;
