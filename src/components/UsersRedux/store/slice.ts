import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './thunk';

export interface User {
	id: number;
	name: string;
}

interface UsersState {
	currentUsers: User[] | null;
	isLoading: boolean;
	error: string | null;
}

const initialState: UsersState = {
	currentUsers: null,
	isLoading: false,
	error: null,
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUsers.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		})
		.addCase(fetchUsers.fulfilled, (state, action) => {
			state.isLoading = false;
			state.currentUsers = action.payload;
		})
		.addCase(fetchUsers.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message || 'Failed to fetch users';
		})
	}
});

export const usersReducer = usersSlice.reducer;
