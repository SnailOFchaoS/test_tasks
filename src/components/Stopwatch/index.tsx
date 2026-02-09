'use client';

import {useState, useCallback} from 'react';
import {useInterval} from '@/src/hooks';
import styles from './Stopwatch.module.scss';

const Stopwatch = () => {
	const [time, setTime] = useState<number>(0)
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const intreval = useInterval({callback: () => setTime(time + 1), delay:  isRunning ? 1000 : null})

	const formatTime = useCallback((time: number) => {
		const seconds = (time % 60).toString();
		const minutes = Math.floor(time / 60 % 60).toString();
		const hours = Math.floor(time / 3600).toString();
		return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
	}, [intreval])

	const handleStart = useCallback(() => {
		setIsRunning(true);
	},[isRunning])

	const handlStop = useCallback(() => {
		setIsRunning(false);
	},[isRunning])

	const handleReset = useCallback(() => {
		setTime(0);
	},[time])

	return (
		<div className = {styles.container}>
			<div className = {styles.timer}>
				{formatTime(time)}
			</div>
			<div className = {styles.buttonsLine}>
				<button className = {styles.button} onClick = {handleStart}>Start</button>
				<button className = {styles.button} onClick = {handlStop}>Pause</button>
				<button className = {styles.button} onClick = {handleReset}>Reset</button>
			</div>
		</div>
	)
}

export {Stopwatch};