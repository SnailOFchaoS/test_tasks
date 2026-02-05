'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './BackButton.module.scss';

export const BackButton = () => {
	const pathname = usePathname();
	const router = useRouter();

	if (pathname === '/') {
		return null;
	}

	return (
		<div className={styles.container}>
			<button 
				onClick={() => router.back()}
				className={styles.button}
			>
				← Назад
			</button>
			<Link href="/" className={styles.homeLink}>
				На главную
			</Link>
		</div>
	);
}
