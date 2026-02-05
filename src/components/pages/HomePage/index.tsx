'use client';

import Link from 'next/link';
import styles from './HomePage.module.scss';
import { tasks } from '@/src/data/tasks';

export const HomePage = () => {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.title}>Задачи</h1>
			</div>

			<div className={styles.tasksList}>
				{tasks.map((task) => (
					<Link 
						key={task.id} 
						href={`/task/${task.id}`}
						className={styles.taskCard}
					>
						<div className={styles.taskCardHeader}>
							<h2 className={styles.taskTitle}>{task.title}</h2>
							<span className={`${styles.statusBadge} ${styles[task.status]}`}>
								{task.status === 'completed' ? '✓ Выполнено' : 'В работе'}
							</span>
						</div>
						<p className={styles.taskDescription}>{task.description}</p>
						<div className={styles.taskFooter}>
							<span className={styles.linkText}>Перейти к решению →</span>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}