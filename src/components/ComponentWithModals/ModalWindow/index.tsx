import { useCallback, useRef, useEffect } from 'react';

import styles from './Modalwindow.module.scss';

interface ModalWindowProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
}

const ModalWindow = ({ isOpen, onClose, title, children }: ModalWindowProps) => {
	const modalRef = useRef<HTMLDivElement>(null);

	const handleOnCloseButtonClick = useCallback(() => {
		onClose();
	}, [onClose]);

	const handleBackgroundClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!modalRef.current || modalRef.current.contains(e.target as Node)) {
				return;
			}
			handleOnCloseButtonClick();
		},
		[handleOnCloseButtonClick]
	);

	// Escape закрывает модалку, подписка зависит от isOpen и onClose
	useEffect(() => {
		if (!isOpen) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, onClose]);

	// Блокировка скролла body при открытой модалке
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	return (
		<div
			className={`${styles.modalBackground} ${isOpen ? '' : styles.isClosed}`}
			onClick={handleBackgroundClick}
		>
			<div className={styles.modalWindow} ref={modalRef}>
				<button
					type="button"
					className={styles.escapeButton}
					onClick={handleOnCloseButtonClick}
					aria-label="Закрыть"
				>
					X
				</button>
				{title != null && <h2 className={styles.modalTitle}>{title}</h2>}
				<div>{children}</div>
			</div>
		</div>
	);
};

export default ModalWindow;