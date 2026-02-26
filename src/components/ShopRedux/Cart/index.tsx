import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { increaseProductCount, decrementProductCount, removeProduct, clearCart} from '../store/slice';
import styles from './Cart.module.scss';

const Cart = () => {
	const dispatch = useDispatch<AppDispatch>();
	const cartItems = useSelector((state: RootState) => state.products.cart)
	
	return (
		<div className={styles.container}>
			<h1>Cart</h1>
			<button
				className={styles.addButton}
				onClick={() => {dispatch(clearCart())}}
			>
				Clear Cart
			</button>
			{cartItems.map((cartItem) => (
				<div className={styles.productItem} key={cartItem.id}>
					<span>{cartItem.name}</span>
					<span>{cartItem.count}</span>
					<button
						className={styles.addButton}
						onClick={() => {dispatch(increaseProductCount(cartItem.id))}}
					>
						+
					</button>
					<button
						className={styles.addButton}
						onClick={() => {dispatch(decrementProductCount(cartItem.id))}}
					>
						-
					</button>
					<button
						className={styles.addButton}
						onClick={() => {dispatch(removeProduct(cartItem.id))}}
					>
						DELETE
					</button>
				</div>
			))}
		</div>
	)
}

export default Cart;