import { useState, useCallback, useEffect } from "react";

const useLocalStorage = <T,>(key: string, initialValue: T[] = [] as T[]) => {
	const [value, setValueState] = useState<T[]>(initialValue);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const item = window.localStorage.getItem(key);
			if (item) {
				setValueState(JSON.parse(item));
			}
		}
	}, [key]);

	const setValue = useCallback((valueInput: T[] | ((prev: T[]) => T[])) => {
		setValueState((prev) => {
			const newValue = typeof valueInput === 'function' ? valueInput(prev) : valueInput;
			if (typeof window !== 'undefined') {
				window.localStorage.setItem(key, JSON.stringify(newValue));
			}
			return newValue;
		});
	}, [key])

	return [value, setValue] as const;
}

export { useLocalStorage };