import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addProduct } from '../store/slice';
import styles from './Products.module.scss';

const Products = () => {
	const dispatch = useDispatch<AppDispatch>();
	const products = useSelector((state: RootState) => state.products.products);
	
	return (
		<div className={styles.container}>
			<h1>Products</h1>
			{products.map((product) => (
				<div 
					className={styles.productItem} 
					key={product.id}
					onClick={() => {dispatch(addProduct(product))}}
				>
					<span>{product.name}</span>
					<span>{product.price}</span>
				</div>
			))}
		</div>
	)
}

export default Products;