export interface TaskData {
	id: string;
	title: string;
	description: string;
	status: 'completed' | 'in-progress';
	component: string;
}

export const tasks: TaskData[] = [
	{
		id: 'todo-list',
		title: 'Todo List с фильтрацией',
		description: 'Создать приложение списка задач (Todo List) с фильтрацией и сохранением данных в localStorage.',
		status: 'completed',
		component: 'TasksListPage'
	}, 
	{
		id: 'component-with-modals',
		title: 'Переиспользуемый компонент модального окна с формой',
		description: 'Создать переиспользуемый компонент модального окна и использовать его для формы создания пользователя.',
		status: 'in-progress',
		component: 'ComponentWithModals'
	}
];

export const getTaskById = (id: string): TaskData | undefined => {
	return tasks.find(task => task.id === id);
};
