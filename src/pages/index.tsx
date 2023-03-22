import { LoginButton } from '#/components/LoginButton';
import { MeasureButton } from '#/components/MeasureButton';
import { MeasurementStatus } from '#/components/MeasurementStatus';
import type { NextPage } from 'next';
import { getProviders, signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

declare const DeviceMotionEvent: {
  requestPermission: () => Promise<'granted' | 'denied'>;
};

type Status = 'initial' | 'progress' | 'completed';

// 3軸合成値
const combinedAcceleration = (acceleration: Required<DeviceMotionEvent['acceleration']>) => {
  if (acceleration == null) return 0;
  return Math.hypot(acceleration.x ?? 0, acceleration.y ?? 0, acceleration.z ?? 0);
};

const Home: NextPage = () => {
  const [s, setS] = useState<{ status: Status; accelerationSeries: number[] }>({
    status: 'initial',
    accelerationSeries: Array(10).fill(0),
  });

  const { data: session } = useSession();

  useEffect(() => {
    // FIXME: 最終的に消す
    console.log('session', session);
  }, [session]);

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
  };

  const deviceMotionAllowed = async () => {
    const isIOS = typeof DeviceMotionEvent.requestPermission === 'function';
    if (!isIOS) return true;
    const res = await DeviceMotionEvent.requestPermission();
    return res === 'granted';
  };

  useEffect(() => {
    const handler = (e: DeviceMotionEvent) => {
      setS(({ status, accelerationSeries: prev }) => {
        if (status !== 'progress') return { status, accelerationSeries: prev };
        const a = combinedAcceleration(e.acceleration);
        return { status, accelerationSeries: [a, ...prev].slice(0, 10) };
      });
    };
    window.addEventListener('devicemotion', handler);
    return () => window.removeEventListener('devicemotion', handler);
  }, []);

  return (
    <>
      <MeasurementStatus status={s.status} accelerationList={s.accelerationSeries} />
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
      <LoginButton
        onClick={() => {
          signIn('spotify').catch((err) => console.error(err));
        }}
      />
    </>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default Home;
