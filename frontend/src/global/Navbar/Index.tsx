import React, { useEffect, useState } from 'react';
import { logout, login } from "@/redux/authSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import ThemeToggle from '../darkLightTheme';

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user, totalQuantity } = useSelector((state: any) => state.auth);
  const [dark, setDark] = useState(false)
    // const [vals, seVal] = useState(false)
    // const { cart, totalQuantity, totalAmount } = useSelector((state: any) => state.auth)


  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      dispatch(login(JSON.parse(storedUser)));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    Cookies.remove("token");
    dispatch(logout());
    router.push('/login');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  //   const handleCli = () => {
  //   console.log("click");
  //   seVal(!vals)
  // }

  // const handleClose = () => {
  //   seVal(false)
  //   console.log("click")
  // }


  return (
    <nav className="bg-[#BB5A3A]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center justify-start flex-1">
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
          </div>
{/* 
          <div className='flex flex-col items-center justify-center min-h-screen'>
          <button className='bg-blue-500 p-2 text-white rounded-md text-sm' onClick={handleCli}>Menu</button>

          {vals ? (
            <div className='absolute inset-y-0 left-0 w-16 '>
              <div className='flex items-center justify-center bg-red-500 w-[30rem] h-screen'>
                sdfs
                </div>
                <div className='mt-[-5rem]'>
                 <button onClick={handleClose}>CLose</button>

                </div>

            </div>
          ) : null}
          </div>
           */}

          <div className="hidden sm:flex sm:items-center sm:justify-center flex-1">
            <div className="flex space-x-4">
              {isAuthenticated ? (
                <>
                  <Link href='/home' className='text-white'>Home</Link>
                  <Link href='/blog' className='text-white'>Blog</Link>
                  <Link href='/blog-post' className='text-white'>Post-Blog</Link>
                <Link href='/cart' className='text-white relative'>
          Cart
          <span className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-black text-white rounded-full h-4 w-4 flex items-center justify-center text-xs'>{totalQuantity}</span>
        </Link>
                     
                </>
              ) : (
                <>
                    <Link href='/home' className='text-white'>Home</Link>
                    
                </>
              )}
            </div>
            
          </div>

          <div className="flex items-center justify-end flex-1 gap-3">
            {isAuthenticated ? (
              <>
                <p className='text-white animate-pulse text-green'>Welcome, {user?.name}!</p>
                <button type="button" className="text-white bg-gradient-to-r from-[#3A9BBB] to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <button type="button" className="text-white bg-gradient-to-r from-[#3A9BBB] to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleLogin}>Login</button>
            )}

                    <ThemeToggle />

          </div>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
