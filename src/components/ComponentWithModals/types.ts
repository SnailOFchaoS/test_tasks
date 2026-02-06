export interface UserItemInputData {
	name: string;
	email: string;
	age: number;
	city?: string;
	bio?: string;
}

export interface UserItem extends UserItemInputData {
	id: string;
	createdAt: number;
}
