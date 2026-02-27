import { createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from './slice';

export const fetchUsers = createAsyncThunk<User[]>(
	'users/fetchUsers',
	async () => {
		const response = await fetch('http://localhost:3001/users');
		if (!response.ok) {
			throw new Error('Failed to fetch users');
		}
		return response.json();
	}
);