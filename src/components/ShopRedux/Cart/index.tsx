import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import styles from './Cart.module.scss';

const Cart = () => {
	const dispatch = useDispatch<AppDispatch>();
	const cartItems = useSelector((state: RootState) => state.products.cart)
	
	return (
		<div className={styles.container}>
			<h1>Products</h1>
			{cartItems.map((cartItem) => (
				<div className={styles.productItem} key={cartItem.id}>
					<span>{cartItem.name}</span>
					<span>{cartItem.price}</span>
				</div>
			))}
		</div>
	)
}

export default Cart;