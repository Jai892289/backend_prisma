"use client"
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import Skeleton from '../Skeleton/Index';


const fetchData = async () => {
    return await fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
    
}


const Blog = () => {
    const [loading, setLoading] = useState(true)
    const { isLoading, data, error } = useQuery('fetchData', fetchData)
const[datas, setDatas] = useState()
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    const API = process.env.NEXT_PUBLIC_API_ENDPOINT

    const fetchDatas = async ()=> {
    return await fetch(`${API}/getAllData`)
    .then((res) => res.json())
    .then((data)=> setDatas(data))
    }
    
    useEffect(() => {
       fetchDatas() 
    }, [])

    console.log("datas", datas)

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
                <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" className="rounded-full h-28 w-28" />
            </div>
        )
    }

    if (error) {
        return <div>Error</div>
    }


    return (
        <>
            <div className='flex flex-wrap w-full'>
                {data?.map((item: any) => (

                    <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
                        {loading ? <Skeleton /> : (
                            <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">{item.body}</p>
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </>

    )
}

export default Blog
