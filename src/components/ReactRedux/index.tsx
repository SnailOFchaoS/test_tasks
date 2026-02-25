import styles from './ReactRedux.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from './store/slice';
import { RootState, store, AppDispatch } from './store';
import { Provider } from 'react-redux';

const Counter = () => {
	const count = useSelector((state: RootState) => state.counter.count);
	const dispatch = useDispatch<AppDispatch>();

	return (
		<div className={styles.container}>
			<button
				type="button"
				className={styles.editButton}
				onClick={() => dispatch(increment())}
			>
				+ 1
			</button>
			<h1>{count}</h1>
			<button
				type="button"
				className={styles.editButton}
				onClick={() => dispatch(decrement())}
			>
				- 1
			</button>
			<button
				type="button"
				className={styles.editButton}
				onClick={() => dispatch(reset())}
			>
				Сброс
			</button>
		</div>
	);
};

const ReactRedux = () => {
	return (
		<Provider store={store}>
			<Counter />
		</Provider>
	);
};

export { ReactRedux };