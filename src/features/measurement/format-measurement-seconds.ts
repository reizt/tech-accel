export const formatMeasurementSeconds = (seconds: number) => {
	const min = Math.floor(seconds / 60);
	const sec = seconds % 60;
	const minStr = min.toString().padStart(2, '0');
	const secStr = sec.toString().padStart(2, '0');
	return `${minStr}:${secStr}`;
};
