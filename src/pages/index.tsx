import type { NextPage } from 'next';
import { getProviders } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BpmCounter } from '#/components/BpmCounter';
import { MeasureButton } from '#/components/MeasureButton';
import { MeasurementStatus } from '#/components/MeasurementStatus';

declare const DeviceMotionEvent: {
	requestPermission: () => Promise<'granted' | 'denied'>;
};

type Status = 'initial' | 'progress' | 'completed';
type AccTransition = 'stopped' | 'increasing' | 'decreasing';
type State = {
	status: Status;
	accelerationSeries: number[];
	totalSteps: number;
	averageStepDuration: number;
	accTransition: AccTransition;
	lastSteppedAt?: number;
};

const ACC_BORDER_BOTTOM = 3;
const ACC_BORDER_TOP = 9;

// 3軸合成値
const combinedAcceleration = (acceleration: Required<DeviceMotionEvent['acceleration']>) => {
	if (acceleration == null) return 0;
	return Math.hypot(acceleration.x ?? 0, acceleration.y ?? 0, acceleration.z ?? 0);
};

const Home: NextPage = () => {
	const [s, setS] = useState<State>({
		status: 'initial',
		accelerationSeries: new Array(10).fill(0),
		totalSteps: 0,
		averageStepDuration: 0,
		accTransition: 'stopped',
	});

	const [bpm, setBpm] = useState<number>(100);

	const startMeasurement = () => {
		deviceMotionAllowed()
			.then((allowed) => {
				if (!allowed) {
					window.alert('ブラウザを再起動してください');
					return;
				}
				setS((prev) => ({ ...prev, status: 'progress' }));
			})
			.catch(() => {
				window.alert('');
			});
	};

	const endMeasurement = () => {
		setS((prev) => ({ ...prev, status: 'completed' }));
		// ms/歩 -> 歩/min
		setBpm(Math.floor((60 * 1000) / s.averageStepDuration));
	};

	const deviceMotionAllowed = async () => {
		const isIOS = typeof DeviceMotionEvent.requestPermission === 'function';
		if (!isIOS) return true;
		const res = await DeviceMotionEvent.requestPermission();
		return res === 'granted';
	};

	useEffect(() => {
		const handler = (e: DeviceMotionEvent) => {
			setS(
				({ status, accelerationSeries: prevSeries, totalSteps, averageStepDuration, accTransition, lastSteppedAt }) => {
					if (status !== 'progress') {
						return { status, accelerationSeries: prevSeries, totalSteps, averageStepDuration, accTransition };
					}

					const newAcc = combinedAcceleration(e.acceleration);
					const lastAcc = prevSeries[0] as number;

					const goThroughTop = lastAcc <= ACC_BORDER_TOP && newAcc > ACC_BORDER_TOP;
					const goThroughBottom = lastAcc > ACC_BORDER_BOTTOM && newAcc <= ACC_BORDER_BOTTOM;

					const stepDetected =
						(goThroughTop && accTransition === 'increasing') || (goThroughBottom && accTransition === 'decreasing');

					const now = Date.now();

					return {
						status,
						accelerationSeries: [newAcc, ...prevSeries].slice(0, 10),
						totalSteps: stepDetected ? totalSteps + 1 : totalSteps,
						averageStepDuration:
							lastSteppedAt !== undefined && stepDetected
								? (averageStepDuration * totalSteps + (now - lastSteppedAt)) / (totalSteps + 1)
								: averageStepDuration,
						accTransition: goThroughTop ? 'decreasing' : goThroughBottom ? 'increasing' : accTransition,
						lastSteppedAt: stepDetected ? now : lastSteppedAt,
					};
				},
			);
		};
		window.addEventListener('devicemotion', handler);
		return () => window.removeEventListener('devicemotion', handler);
	}, []);

	return (
		<div className="relative flex flex-col items-center justify-between gap-y-56 px-36 pb-144 pt-112">
			<button
				type="button"
				className="absolute right-16 top-16 flex size-48 items-center justify-center hover:bg-white-500"
			>
				<svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M0 16H24V13.3333H0V16ZM0 9.33333H24V6.66667H0V9.33333ZM0 0V2.66667H24V0H0Z" fill="#647284" />
				</svg>
			</button>
			<MeasurementStatus status={s.status} accelerationList={s.accelerationSeries} />
			<BpmCounter bpm={bpm} onMinus={() => setBpm((prev) => prev - 1)} onPlus={() => setBpm((prev) => prev + 1)} />
			<MeasureButton
				measuring={s.status === 'progress'}
				leftSeconds={0}
				onClick={() => {
					if (s.status === 'initial' || s.status === 'completed') {
						startMeasurement();
					} else {
						endMeasurement();
					}
				}}
			/>
			<Link
				href={{ pathname: '/playlist', query: { bpm } }}
				className="fixed bottom-24 right-24 flex size-64 items-center justify-center rounded-full bg-blue-700 duration-150 hover:bg-black"
			>
				<svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g filter="url(#filter0_i_18_79)">
						<path
							d="M15.1579 0H0V2.52632H15.1579V0ZM15.1579 5.05263H0V7.57895H15.1579V5.05263ZM0 12.6316H10.1053V10.1053H0V12.6316ZM17.6842 0V10.3326C17.2926 10.1937 16.8632 10.1053 16.4211 10.1053C14.3242 10.1053 12.6316 11.7979 12.6316 13.8947C12.6316 15.9916 14.3242 17.6842 16.4211 17.6842C18.5179 17.6842 20.2105 15.9916 20.2105 13.8947V2.52632H24V0H17.6842Z"
							fill="#F0F5FF"
						/>
					</g>
					<defs>
						<filter
							id="filter0_i_18_79"
							x="0"
							y="0"
							width="24"
							height="18.6842"
							filterUnits="userSpaceOnUse"
							colorInterpolationFilters="sRGB"
						>
							<feFlood floodOpacity="0" result="BackgroundImageFix" />
							<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
							<feColorMatrix
								in="SourceAlpha"
								type="matrix"
								values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
								result="hardAlpha"
							/>
							<feOffset dy="1" />
							<feGaussianBlur stdDeviation="0.5" />
							<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
							<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
							<feBlend mode="normal" in2="shape" result="effect1_innerShadow_18_79" />
						</filter>
					</defs>
				</svg>
			</Link>
		</div>
	);
};

export async function getServerSideProps() {
	const providers = await getProviders();
	return {
		props: { providers },
	};
}

export default Home;
