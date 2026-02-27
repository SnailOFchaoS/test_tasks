'use client';

import { useParams } from 'next/navigation';
import { getTaskById } from '@/src/data/tasks';
import { 
  TasksListPage, 
  ComponentWithModals, 
  Stopwatch, 
  ReactRedux, 
  ShopRedux,
  UsersRedux
} from '@/src/components';
import Link from 'next/link';
import styles from './TaskPage.module.scss';

export const TaskPage = () => {
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

  const renderTaskComponent = () => {
    switch (task.component) {
      case 'TasksListPage':
        return <TasksListPage />;
      case 'ComponentWithModals':
        return <ComponentWithModals />;
      case 'Stopwatch':
        return <Stopwatch />;
      case 'ReactRedux':
        return <ReactRedux />;
      case 'ShopRedux':
        return <ShopRedux />;
      case 'UsersRedux':
        return <UsersRedux />;
      default:
        return <div>Компонент не найден</div>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{task.title}</h1>
        <Link href={`/task/${taskId}/comments`} className={styles.commentsLink}>
          Комментарии
        </Link>
      </div>
      {renderTaskComponent()}
    </div>
  );
}
