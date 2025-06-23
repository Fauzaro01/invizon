'use client'
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/admin');
      }
      auth.signOut().then(() => {
        console.log('User signed out successfully');
        router.push('/admin');
      }).catch((error) => {
        console.error('Sign out error:', error);
      });
    });

    return () => unsubscribe();
  }, [router]);

  return null;
}
