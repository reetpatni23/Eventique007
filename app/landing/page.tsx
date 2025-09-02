"use client";
import Body from './landing';
import Header from './../components/header';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Landing() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('userInfo') === null) {
      router.push('/login');
    }
  }, [router]); // ✅ run once on mount & include router

  return (
    <div>
      <Header />
      <Body />
    </div>
  );
}
