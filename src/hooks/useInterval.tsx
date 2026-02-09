import {useEffect, useRef} from 'react';

interface UseIntervalProps {
	callback: () => void;
	delay: number | null;
}

const useInterval = ({ callback, delay }: UseIntervalProps) => {
	const currentCallback = useRef(callback);

	useEffect(() => {
		currentCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		if (delay === null) return;
		const tick = () => currentCallback.current();
		const interval = setInterval(tick, delay);
		return () => clearInterval(interval);
	}, [delay]);
};

export {useInterval};