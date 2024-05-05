"use client"
import React from 'react'
import { useQuery } from 'react-query';
import image from "../../assets/spinner.svg"
import loader from "../../global/loader";

const fetchData = async () => {
    return await fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
}

const Blog = () => {
    const { isLoading, data, error } = useQuery('fetchData', fetchData)

    if (isLoading) {
        return (
            <div className="relative flex justify-center items-center">
                <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
                <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" className="rounded-full h-28 w-28" />
            </div>
        )
    }

    if (error) {
        return <div>Error</div>
    }


    return (
        <div>
            {data?.map((item: any) => (
                <h1 key={item.id}>{item.title}</h1>
            ))}
        </div>
    )
}

export default Blog
