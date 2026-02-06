'use client';

import { useState, useCallback } from 'react';

import { UserItem, UserItemInputData } from './types';
import ModalWindow from './ModalWindow';
import { useLocalStorage } from '@/src/hooks';

import styles from './ComponentWithModals.module.scss';

const userItemDefaultData: UserItemInputData = {
	name: '',
	email: '',
	age: 0,
	city: '',
	bio: '',
};

export const ComponentWithModals = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [currentData, setCurrentData] = useState<UserItemInputData>(userItemDefaultData);
	const [users, addUser] = useLocalStorage<UserItem>('users', []);

	const handleAddButtonClick = useCallback(() => {
		setCurrentData(userItemDefaultData);
		setIsOpen(true);
	}, []);

	const closeModal = useCallback(() => {
		setIsOpen(false);
	}, []);

	const validateInput = useCallback((field: keyof UserItemInputData) => {
		switch (field) {
			case 'name':
				return currentData.name.length < 2;
			case 'email':
				return !currentData.email.includes('@');
			case 'age':
				return currentData.age < 18 || currentData.age > 100;
			default:
				return false;
		}
	}, [currentData]);

	const handleFieldChange = useCallback((field: keyof UserItemInputData) => {
		return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const v = e.target.value;
			setCurrentData((prev) => {
				if (field === 'age') {
					return { ...prev, age: v === '' ? 0 : Number(v) };
				}
				return { ...prev, [field]: v };
			});
		};
	}, []);

	const isFormInvalid = validateInput('name') || validateInput('email') || validateInput('age');

	const handleSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (isFormInvalid) return;
			const newUser: UserItem = {
				...currentData,
				id: crypto.randomUUID(),
				createdAt: Date.now(),
			};
			addUser([...users, newUser]);
			setCurrentData(userItemDefaultData);
			closeModal();
		},
		[users, currentData, isFormInvalid, addUser, closeModal]
	);

	return (
		<div className={styles.container}>
			<button
				className={styles.addUserButton}
				onClick={handleAddButtonClick}
				disabled={isOpen}
			>
				Add User
			</button>
			<div className={styles.usersContainer}>
				{users.map((item) => (
					<div className={styles.userItem} key={item.id}>
						<span>{item.name}</span>
					</div>
				))}
			</div>
			<ModalWindow isOpen={isOpen} onClose={closeModal} title="Создание пользователя">
				<form onSubmit={handleSubmit} className={styles.inputContainer}>
					<div className={styles.inputWrapper}>
						<input
							type="text"
							placeholder="name"
							required
							minLength={2}
							className={styles.input}
							value={currentData.name}
							onChange={handleFieldChange('name')}
						/>
						{validateInput('name') && (
							<span className={styles.error}>Введите более 2 символов</span>
						)}
					</div>
					<div className={styles.inputWrapper}>
						<input
							type="email"
							placeholder="email"
							className={styles.input}
							value={currentData.email}
							onChange={handleFieldChange('email')}
						/>
						{validateInput('email') && (
							<span className={styles.error}>Введите корректный email</span>
						)}
					</div>
					<div className={styles.inputWrapper}>
						<input
							type="number"
							min={18}
							max={100}
							placeholder="age"
							className={styles.input}
							value={currentData.age === 0 ? '' : currentData.age}
							onChange={handleFieldChange('age')}
						/>
						{validateInput('age') && (
							<span className={styles.error}>Введите возраст от 18 до 100</span>
						)}
					</div>
					<div className={styles.inputWrapper}>
						<input
							type="text"
							placeholder="city"
							className={styles.input}
							value={currentData.city ?? ''}
							onChange={handleFieldChange('city')}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<textarea
							placeholder="bio"
							className={styles.input}
							maxLength={500}
							value={currentData.bio ?? ''}
							onChange={handleFieldChange('bio')}
						/>
						<span>{currentData.bio?.length ?? 0} / 500</span>
					</div>
					<button
						type="submit"
						className={styles.addUserButton}
						disabled={isFormInvalid}
					>
						Add User
					</button>
				</form>
			</ModalWindow>
		</div>
	);
};