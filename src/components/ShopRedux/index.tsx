import styles from './ShopRedux.module.scss';
import { Provider } from 'react-redux';
import { store } from './store';
import Products from './Products';
import Cart from './Cart';

const ShopRedux = () => {
	return (
		<Provider store={store}>
			<div className={styles.container}>
				<div className={styles.productsContainer}>
					<Products />
				</div>
				<div className={styles.cartContainer}>
					<Cart />
				</div>
			</div>
		</Provider>
	)
}

export { ShopRedux };