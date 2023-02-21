import type { FC } from 'react';

type Props = {};

export const LoginButton: FC<Props> = () => {
  return <button className="h-48 min-w-320 rounded-32 bg-green-spotify text-16 text-white shadow-login-button">ログイン</button>;
};
