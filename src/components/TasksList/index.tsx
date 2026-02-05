'use client';

import {useMemo, useCallback, useState} from 'react';
import { useLocalStorage } from '@/src/hooks';

import styles from './TasksListPage.module.scss';
import { TaskItem, FilterType } from './TasksListPage.types';

const TasksListPage = () => {
	const [tasks, setTasks] = useLocalStorage<TaskItem>('tasks', []);
	const [filter, setFilter] = useState<FilterType>('all');

	const filteredTasks = useMemo(() => {
		switch(filter){
			case 'active':
				return tasks.filter((task) => !task.completed);
			case 'completed':
				return tasks.filter((task) => task.completed);
			case 'all':
			default:
				return tasks;
		}
	}, [tasks, filter]);

	const activeTasksCount = useMemo(() => {
		return tasks.filter((task) => !task.completed).length;
	}, [tasks]);

	const handleAddTask = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
		if(e.key === 'Enter') {
			const text = e.currentTarget.value.trim();
			if (!text) return;
			
			setTasks([
				...tasks, 
				{
					id: crypto.randomUUID(), 
					text: text, 
					completed: false, 
					createdAt: Date.now()
				}
			]);
			e.currentTarget.value = '';
		};
	}, [tasks, setTasks])

	const handleDeleteTask = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		const id = e.currentTarget.dataset.id;
		if (id) {
			setTasks(tasks.filter((task) => task.id !== id));
		}
	},[tasks, setTasks])

	const handleCompleteTask = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		const id = e.currentTarget.dataset.id;
		if(id){
			setTasks(tasks.map((task) => 
				task.id === id ? {...task, completed: !task.completed} : task
			));
		}
	}, [tasks, setTasks])

	const handleFilterChange = useCallback((newFilter: FilterType) => {
		setFilter(newFilter);
	}, [])

	return (
		<div className={styles.container}>
			<h1>Tasks</h1>
			<div className={styles.inputContainer}>
				<input 
					placeholder='Add new task and press Enter' 
					className={styles.input}
					onKeyDown={handleAddTask}
				/>
			</div>
			
			<div className={styles.filtersContainer}>
				<button 
					onClick={() => handleFilterChange('all')}
					className={`${styles.filterButton} ${filter === 'all' ? styles.filterButtonActive : ''}`}
				> 
					All
				</button>
				<button 
					onClick={() => handleFilterChange('active')}
					className={`${styles.filterButton} ${filter === 'active' ? styles.filterButtonActive : ''}`}
				> 
					Active
				</button>
				<button 
					onClick={() => handleFilterChange('completed')}
					className={`${styles.filterButton} ${filter === 'completed' ? styles.filterButtonActive : ''}`}
				> 
					Completed
				</button>
			</div>

			<div className={styles.counter}>
				{activeTasksCount} {activeTasksCount === 1 ? 'task' : 'tasks'} left
			</div>

			<div className={styles.tasksContainer}>
				{filteredTasks.length === 0 ? (
					<div className={styles.emptyMessage}>
						{filter === 'all' ? 'No tasks yet' : 
						 filter === 'active' ? 'No active tasks' : 
						 'No completed tasks'}
					</div>
				) : (
					filteredTasks.map((task: TaskItem) => {
						return (
							<div 
								key={task.id} 
								className={`${styles.taskItem} ${task.completed ? styles.taskItemCompleted : ''}`}
							>
								<span className={task.completed ? styles.taskTextCompleted : ''}>
									{task.text}
								</span>
								<button 
									className={styles.deleteButton}
									data-id={task.id}
									onClick={handleDeleteTask}
								>
									Delete
								</button>
								<button 
									className={`${styles.completeButton} ${task.completed ? styles.completeButtonDone : ''}`}
									data-id={task.id}
									onClick={handleCompleteTask}
									disabled={task.completed}
								>
									{task.completed ? 'Completed' : 'Complete'}
								</button>
							</div>
						)
					})
				)}
			</div>
		</div>
	)
}

export { TasksListPage };