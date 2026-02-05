'use client';

import { useState, useEffect } from 'react';
import styles from './CommentsPage.module.scss';

interface CommentsPageProps {
	taskId: string;
}

export const CommentsPage = ({ taskId }: CommentsPageProps) => {
	const [commentsText, setCommentsText] = useState<string>('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const response = await fetch(`/api/comments/${taskId}`);
				if (response.ok) {
					const data = await response.json();
					setCommentsText(data.text || '');
				} else {
					console.error('Failed to fetch comments:', response.status, response.statusText);
					setCommentsText('');
				}
			} catch (error) {
				console.error('Error fetching comments:', error);
				setCommentsText('');
			} finally {
				setLoading(false);
			}
		};

		if (taskId) {
			fetchComments();
		} else {
			setLoading(false);
		}
	}, [taskId]);

	if (loading) {
		return (
			<div className={styles.container}>
				<div className={styles.emptyMessage}>Загрузка комментариев...</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.commentsContent}>
				<pre className={styles.commentsText}>{commentsText || 'Комментарии отсутствуют'}</pre>
			</div>
		</div>
	);
}
