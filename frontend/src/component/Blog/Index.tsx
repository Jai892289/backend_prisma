"use client"

import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';
import { urls } from '@/utils/baseUrl';
import { BackButton } from '@/global/backButton';
import BlogCard from '@/global/blogCard';
import Link from 'next/link';

const Blog = () => {
    const [user, setUser] = useState<any>();
    const token = Cookies.get('token');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState<any>(0);
    const [limit, setLimit] = useState<any>(8);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [totalPage, setTotalPage] = useState<any>();
    const [totalCurrentPage, setTotalCurrentPage] = useState<any>(0);
    

    useEffect(() => {
        const value = sessionStorage.getItem("user");
        if (value) {
            setUser(JSON.parse(value));
        }
    }, []);

    const userId = user?.id;
    console.log("userId", userId)

    const fetchData = async () => {
        const response = await fetch(`${urls}/author-get?id=${userId}&page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.json();
    };

    const fetchSearchResults = async () => {
        const response = await fetch(`${urls}/post?id=${userId}&search=${search}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.json();
    };

    const { isLoading, data, error } = useQuery(['fetchData', page], fetchData, {
        enabled: !!userId,
        onSuccess: (data) => {
            setTotalPage(data);
        },
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleClick = async () => {
        const results = await fetchSearchResults();
        setSearchResults(results.data);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#BB5A3A]"></div>
                <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" className="rounded-full h-28 w-28" />
            </div>
        );
    }

    const totalPages = totalPage?.totalPages ? parseInt(totalPage?.totalPages) : 0;
    const currentPage = totalPage?.currentPage ? parseInt(totalPage?.currentPage) : 0;

    if (error) {
        return <div>Error</div>;
    }

    const posts = searchResults.length > 0 ? searchResults : data?.data?.[0]?.post;

    const handlePrev = () => {
        if (currentPage > 0) {
            setPage((prevPage: any) => prevPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setPage((prevPage: any) => prevPage + 1);
        }
    };

    

    return (
        <>
            <BackButton />

            <div className="max-w-lg mx-auto">
                <div className="flex">
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                    <div className="relative w-full">
                        <input type="search" onChange={handleSearch} value={search} id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg focus:ring-[#BB5A3A] focus:border-[#BB5A3A] dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-[#BB5A3A]" placeholder="Search Here ..." required />
                        <button type="submit" onClick={handleClick} className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#BB5A3A] rounded-e-lg border border-[#BB5A3A] hover:bg-[#BB5A3A] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-[#BB5A3A] dark:hover:bg-[#BB5A3A] dark:focus:ring-[#BB5A3A]">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </div> 

            <div className="flex flex-wrap w-full">

                {posts?.map((item: any) => (
                    <BlogCard
                        title={item.title}
                        content={item.content}
                        image={item.image}
                        alt={item.image}
                        buttonName="Read"
                        path='blog'
                        slug={item.id}
                    />
                ))} 

                
            {/* {posts?.length > 0 ? (
                <div className='flex flex-wrap w-full'>
                    {posts.map((item: any) => (
                        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3" key={item.id}>
                            <img className="rounded-t-lg" src={item.image} alt="" />
                            <div className="p-5">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">{item.title}</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-1">{item.content}</p>
                                <Link
                                    href={`/blog/${item.id}`}
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Read more
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h2>No post found</h2>
            )} */}
            </div>

            <h2 className='m-5'>Page {currentPage} out of {totalPages}</h2>
            <div className='flex justify-between m-5'>

                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </>
    );
}

export default Blog;