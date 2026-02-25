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
		status: 'completed',
		component: 'ComponentWithModals'
	},
	{
		id: 'stopwatch',
		title: 'Сделать страницу с секундомером: закуск, пауза, сброс',
		description: 'Сделать страницу с секундомером: запуск, пауза, сброс, отображение времени в формате MM:SS или HH:MM:SS.',
		status: 'completed',
		component: 'Stopwatch'
	},
	{
		id: 'react-redux',
		title: 'React Redux',
		description: 'Создать приложение с использованием React Redux для управления состоянием приложения.',
		status: 'in-progress',
		component: 'ReactRedux'
	}
];

export const getTaskById = (id: string): TaskData | undefined => {
	return tasks.find(task => task.id === id);
};
