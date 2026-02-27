'use client';

import styles from './UsersRedux.module.scss';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, store } from './store';
import { fetchUsers } from './store/thunk';
import type { User } from './store/slice';
import { useEffect } from 'react';

const UsersList = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { currentUsers, isLoading, error } = useSelector((state: RootState) => state.users);
	
	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);
	

	return (
		<div className={styles.container}>
			<h1>Users</h1>
			{isLoading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{currentUsers?.map((user: User) => (
				<div key={user.id}>
					<h2>{user.name}</h2>
				</div>
			))}
			<button 
				className={styles.fetchButton}
				onClick={() => dispatch(fetchUsers())}
			>
				Fetch Users
			</button>
		</div>
	)
}

const UsersRedux = () => {
	return (
		<Provider store={store}>
			<UsersList />
		</Provider>
	)
}
	

export { UsersRedux };