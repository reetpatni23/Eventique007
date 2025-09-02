'use client';
import dynamic from 'next/dynamic';

const LoginSuccessClient = dynamic(() => import('./LoginSuccessClient'), {
  ssr: false,
});

export default function Page() {
  return <LoginSuccessClient />;
}
