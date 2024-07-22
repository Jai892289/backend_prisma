"use client";
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';
import Skeleton from '@/global/Skeleton/Index';
import Link from 'next/link';
import Sidebar from '@/global/Sidebar/Index';
import CryptoJS from 'crypto-js';
import Image from 'next/image';
import sad from "../../assets/sad.jpg";
import { urls } from '@/utils/baseUrl';
import BlogCard from '@/global/blogCard';
// import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/outline';

import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/solid'
import Chat from '@/global/chatBot';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '@/redux/authSlice';
import toast, {Toaster} from 'react-hot-toast';

const Home = () => {
  const token = Cookies.get('token');
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [posts, setPosts] = useState<any>([]);
  const [vals, seVal] = useState(false);
  const [chartData, setChatData] = useState<any>([])
  const items = useSelector((state:any)=> state?.auth?.product)


  const fetchData = async (page: any) => {
    const response = await fetch(`${urls}/get?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  };


  const { isLoading, data, error } = useQuery(['fetchData', currentPage], () => fetchData(currentPage));

  useEffect(() => {
    if (data) {
      setPosts(data?.data?.user);
      setTotalPages(data?.data?.totalPages);
    }
  }, [data]);

  useEffect(() => {
    fetch('http://localhost:4000/auth/api/v1/all-chat')
      .then((res) => res.json())
      .then((data) => setChatData(data));
  }, [])

  console.log("chartData", chartData)

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#BB5A3A]"></div>
        <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" className="rounded-full h-28 w-28" />
      </div>
    );
  }

  if (error) {
    return <div>Error</div>;
  }

  const handleCategoryClick: any = () => {
    console.log("click")
    alert("click")
  }

  const hashId = (id: any) => {
    return CryptoJS.SHA256(id).toString(CryptoJS.enc.Hex);
  };

  console.log("posts", posts[0]?.created_at)

  const val = posts[0]?.created_at;

  const f = val?.split("T")[0]


  // const handleCli = () => {
  //   console.log("click");
  //   seVal(!vals)
  // }

  // const handleClose = () => {
  //   seVal(false)
  // }


  const header = [
    { name: "socketId" },
    { name: "naame" },
    {name:"room"}
  ]

  const handleCart = (item:any) => {
    toast.success("successfully added")
    dispatch(addToCart(item))
  }

  return (
    <>
      <Toaster />

      <video src={require('../../assets/watermarked_preview.mp4')} autoPlay muted loop className='w-full' />

      <div className='flex-grow container mx-auto'>
        <h2 className='flex justify-center items-center text-4xl font-bold pt-[3rem] pb-[3rem] '>Our <span className='text-[#BB5A3A] ml-2'> Top  Products </span></h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {items.slice(0, 4).map((item:any) => (
            <div className="w-[22rem] mx-auto overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300" >
              <div className="relative group">
                <img
                  className="object-cover w-full h-70 transform group-hover:scale-105 transition-transform duration-300"
                  src={item.image}
                  alt="Product"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-center p-10 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-5">
                  <button className="p-2 text-white bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-300">
                    <HeartIcon className="w-6 h-6" />
                  </button>
                  <button className="p-2 text-white bg-[#BB5A3A] rounded-full hover:bg-[#BB5A3A] transition-colors duration-300">
                    <ShoppingCartIcon className="w-6 h-6" onClick={()=> handleCart(item)} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="mt-2 text-gray-600">{item.desc}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-gray-900">${item.price}</span>
                  <button onClick={()=> dispatch(addToCart(item)) } className="px-4 py-2 text-sm text-white bg-[#BB5A3A] rounded-full hover:bg-[#BB5A3A] transition-colors duration-300">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>


      <main className="flex-grow container mx-auto px-4 py-8 grid grid-cols-3 gap-8 mt-4">
        <div className="col-span-2">
          {posts?.slice(0, 3)?.map((item: any) => {
            const date = new Date(item?.created_at);
            const formattedDate = date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            return (
              <div key={item.id} className="flex bg-white border border-gray-200 shadow mb-6">
                <img className="w-1/3 object-cover" src={item.image} alt={item.title} />
                <div className="p-6">
                  <Link href={`/home/${item.id}`}>
                    <p className="mb-2 text-xs font-bold text-gray-900">{formattedDate}</p>
                    <h2 className="mb-2 text-xl font-bold text-gray-900 line-clamp-1">{item.title}</h2>
                    <p className="text-gray-700 line-clamp-5">{item.content}</p>
                  </Link>
                </div>
              </div>

            );
          })}

        </div>

        {/* <div className='flex flex-col items-center justify-center min-h-screen'>
          <button className='bg-red-500 p-2 text-white rounded-md' onClick={handleCli}>Click</button>

          {vals ? (
            <div className='flex items-center justify-center fixed inset-0'>
              <div className='flex items-center justify-center bg-red-500 w-[30rem] h-[20rem]'>
                sdfs
              </div>
              <button onClick={handleClose}>CLose</button>

            </div>
          ) : null}
        </div> */}

        {/* {vals ? (
          <div className='flex bg-red-500 w-[30rem] h-[20rem]'>
            sdfs
          </div>
        ) :  null} */}

        <aside className="col-span-1">
          <div className="p-12 mb-6 h-[30rem] bg-[#BB5A3A]">
            <h2 className="flex text-4xl font-bold mb-4 text-white justify-center items-center mt-10 font-mono">Let the posts come to you.</h2>
            <form>
              <input type="email" className="w-full p-2 mb-4 mt-20 border" placeholder="Email" />
              <button type="submit" className="w-full bg-white text-[#BB5A3A] py-2">Subscribe</button>
            </form>
          </div>
          <div className="bg-gray-100 p-6 h-[18rem]">
            <h2 className="text-xl font-bold mb-4">Find me on Instagram</h2>
            <div className="grid grid-cols-2 gap-2">
              <img src="/path/to/insta1.jpg" alt="Instagram 1" className="object-cover" />
              <img src="/path/to/insta2.jpg" alt="Instagram 2" className="object-cover" />
              <img src="/path/to/insta3.jpg" alt="Instagram 3" className="object-cover" />
              <img src="/path/to/insta4.jpg" alt="Instagram 4" className="object-cover" />
            </div>
          </div>
        </aside>
      </main>

      <main className="flex-grow bg-[#BB5A3A] p-[5rem]">
      {/* <main className="flex-grow  p-[5rem]"> */}

        <h2 className="text-4xl font-bold text-center mb-6 text-white font-mono ">Let me know what's on your mind</h2>
        <form className="max-w-3xl mx-auto p-8 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium text-white">First Name</label>
              <input type="text" id="first-name" className="mt-1 block w-full p-2 border border-white rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-medium text-white">Last Name</label>
              <input type="text" id="last-name" className="mt-1 block w-full p-2 border border-white rounded-md shadow-sm" />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-white">Email <span className="text-red-500">*</span></label>
            <input type="email" id="email" className="mt-1 block w-full p-2 border border-white rounded-md shadow-sm" required />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-white">Leave us a message...</label>
            <textarea id="message" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" rows={5}></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="bg-white text-black-500 py-2 px-4 rounded-md w-full">Submit</button>
          </div>
        </form>




        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-9">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                {header.map((item) => (
                  <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  {item.name}
                </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">
                  Silver
                </td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  Laptop
                </td>
                <td className="px-6 py-4">
                  Join Chat Room
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </main>



      <Chat />

      <FloatingWhatsApp
        phoneNumber="7366042663"
        accountName="Help Desk"
        // chatMessage={
        //     "Hello there!. How can we help?"
        // }
        chatMessage={
          "Hello there! How can we help?\n" +
          "You can ask us about our services.\n" +
          "Feel free to reach out anytime."
        }
        notification
        notificationSound
      />

    </>
  );
};

export default Home;