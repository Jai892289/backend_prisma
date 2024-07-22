"use client"
import React from 'react';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';
import { URLS } from '@/utils/baseUrl';
import Loader from '@/global/loader';

const HomeDetails = ({ id }: { id: number }) => {

  const token = Cookies.get("token")

  const fetchData = async () => {
    return await fetch(`${URLS}/auth/api/v1/post-get?id=${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
  }

  const { isLoading, error, data } = useQuery('values', fetchData)

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <p>error</p>
  }

  return (
    <>
      {data ? (
      <div className="w-11/12 mx-auto my-10 bg-white overflow-hidden">
      <img src={data?.data?.image} alt="Uploaded Image" className="w-full h-[40rem] object-cover" />
      <div className="mt-10 mb-10">
        <h1 className="text-4xl font-bold mb-4">{data?.data?.title}</h1>
        <p className="text-gray-700">{data?.data?.content}</p>
      </div>
      </div>
      ): null}
    </>
  )
}

export default HomeDetails