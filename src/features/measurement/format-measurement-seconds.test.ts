import { describe, expect, test } from 'vitest';
import { formatMeasurementSeconds } from './format-measurement-seconds';

describe(formatMeasurementSeconds.name, () => {
	test('0', () => {
		const seconds = 0;
		const str = formatMeasurementSeconds(seconds);
		expect(str).toBe('00:00');
	});
	test('1 - 59', () => {
		const seconds = 45;
		const str = formatMeasurementSeconds(seconds);
		expect(str).toBe('00:45');
	});
	test('60 - 599', () => {
		const seconds = 84;
		const str = formatMeasurementSeconds(seconds);
		expect(str).toBe('01:24');
	});
	test('600 -', () => {
		const seconds = 712;
		const str = formatMeasurementSeconds(seconds);
		expect(str).toBe('11:52');
	});
});
