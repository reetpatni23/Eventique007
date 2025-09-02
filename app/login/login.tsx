'use client';
import Image from 'next/image';
import '@appwrite.io/pink';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { AppwriteConfig } from '@/constants/appwrite_config';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginComponent() {
  const router = useRouter();
  const appwriteConfig = new AppwriteConfig();

  useEffect(() => {
    // If already logged in, redirect immediately
    if (localStorage.getItem('userInfo') !== null) {
      router.push('/success');   // ✅ go to success
    }
  }, [router]);

  // ✅ Handle Google login
  const handleGoogleLogin = async () => {
    try {
      await appwriteConfig.googlelog();
      router.push('/success');   // ✅ go to success
    } catch (err) {
      console.error('Google login failed:', err);
      router.push('/failure');   // optional failure redirect
    }
  };

  // ✅ Handle GitHub login
  const handleGithubLogin = async () => {
    try {
      await appwriteConfig.githublog();
      router.push('/success');   // ✅ go to success
    } catch (err) {
      console.error('GitHub login failed:', err);
      router.push('/failure');   // optional failure redirect
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12'>
      <div className='p-10 xs:p-0 mx-auto md:w-full md:max-w-md'>
        <Image
          src='/logo-transparent-png.png'
          alt='company-logo'
          width={200}
          height={200}
          className='align-items-center mx-auto my-10'
        />
        <div className='bg-white shadow w-full rounded-lg divide-y divide-gray-200'>
          <div className='text-grey-700 mx-auto my-auto font-bold my-5 flex align-items-center justify-evenly py-5'>
            Login Using
          </div>
          <div className='p-5'>
            <div className='grid grid-cols-2 gap-1'>
              {/* ✅ Google login */}
              <button
                type='button'
                onClick={handleGoogleLogin}
                className='gap-2 transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal flex align-items-center'
              >
                <div className='flex align-items-center gap-1 justify-center mx-auto'>
                  <FcGoogle className='text-xl my-auto' />
                  <p className='my-auto'>Google</p>
                </div>
              </button>

              {/* ✅ GitHub login */}
              <button
                type='button'
                onClick={handleGithubLogin}
                className='gap-2 transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal flex align-items-center'
              >
                <div className='flex align-items-center gap-1 justify-center mx-auto'>
                  <AiFillGithub className='text-xl my-auto' />
                  <p className='my-auto'>Github</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className='py-5'>
          <div className='grid grid-cols-2 gap-1'>
            <div className='text-center sm:text-left whitespace-nowrap'>
              <button
                className='transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset'
                onClick={() => router.back()}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  className='w-4 h-4 inline-block align-text-top'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M10 19l-7-7m0 0l7-7m-7 7h18'
                  />
                </svg>
                <span className='inline-block ml-1'>Back to Home</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
