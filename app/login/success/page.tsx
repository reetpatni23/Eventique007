'use client';
import dynamic from 'next/dynamic';

const LoginSuccessClient = dynamic(() => import('./LoginSuccessClient'), {
  ssr: false,
});

// app/login/success/page.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import appwrite from '@/constants/appwrite_config';

export default function SuccessPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const user = await appwrite.getCurUser();
        if (user) {
          localStorage.setItem('userInfo', JSON.stringify(user));
          router.replace('/landing'); // or wherever
        } else {
          router.replace('/login');
        }
      } catch (e) {
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  if (loading) return <div className="p-6">Completing sign-in…</div>;
  return null;
}
