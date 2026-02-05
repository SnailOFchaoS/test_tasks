'use client';

import { useParams } from 'next/navigation';
import { getTaskById } from '@/src/data/tasks';
import { CommentsPage } from '@/src/components';
import Link from 'next/link';
import styles from './CommentsPage.module.scss';

export default function TaskCommentsPage() {
  const params = useParams();
  const taskId = params.id as string;
  const task = getTaskById(taskId);

  if (!task) {
    return (
      <div className={styles.container}>
        <h1>Задача не найдена</h1>
        <Link href="/">Вернуться на главную</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Комментарии к задаче: {task.title}</h1>
        <Link href={`/task/${taskId}`} className={styles.backLink}>
          ← Вернуться к задаче
        </Link>
      </div>
      <CommentsPage taskId={taskId} />
    </div>
  );
}
