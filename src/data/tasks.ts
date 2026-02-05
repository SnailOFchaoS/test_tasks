export interface TaskData {
	id: string;
	title: string;
	description: string;
	status: 'completed' | 'in-progress';
	component: string; // Название компонента для рендеринга
}

export const tasks: TaskData[] = [
	{
		id: 'todo-list',
		title: 'Todo List с фильтрацией',
		description: 'Создать приложение списка задач (Todo List) с фильтрацией и сохранением данных в localStorage.',
		status: 'completed',
		component: 'TasksListPage'
	}
];

export const getTaskById = (id: string): TaskData | undefined => {
	return tasks.find(task => task.id === id);
};
