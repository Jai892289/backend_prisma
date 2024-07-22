"use client"

import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import CryptoJS from 'crypto-js';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from 'axios';
import Skeleton from '@/global/Skeleton/Index';
import { urls } from '@/utils/baseUrl';
import { BackButton } from '@/global/backButton';
import Link from 'next/link';

const BlogDetails = ({ id }: { id: number }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [comment, setComment] = useState<any>();
    const [user, setUser] = useState<any>();

    const token = Cookies.get('token');
    const router = useRouter();
    const queryClient = useQueryClient();
    console.log("id", id)

    const initialValues = {
        comment: '',
        post_id: 10
    }

    /////////////////////////////////////////

    // useEffect(() => {
    //     const value = sessionStorage.getItem("user");
    //     if (value) {
    //         setUser(JSON.parse(value));
    //     }
    // }, []);

    // const userId = user?.id;
    // console.log("userId", userId)

    const postId = id
    ///////////////////////////////////////// /////////////////////////////////////////////////////////

    const fetchComment = async () => {
        const res = await fetch(`${urls}/comment-get?post_id=${postId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json());

        setComment(res.data)
    };

    useEffect(() => {
        fetchComment()
    }, [])

    console.log("comment", comment)

    const fetchPost = async (id: number) => {
        return await fetch(`${urls}/post-get?id=${postId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json());
    };

    const { isLoading, data, error } = useQuery(['fetchPost', postId], () => fetchPost(postId as any), {
        onSuccess: (data) => {
            setTitle(data?.data?.title);
            setContent(data?.data?.content);
        }
    });

    const deletePost = async () => {
        const data = await fetch(`${urls}/author-delete?id=${postId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json());

        if (data) {
            toast.success("Post deleted successfully");
            setTimeout(() => (
                router.push('/blog')
            ), 2000);
        }
    };

    const updatePost = async () => {
        const updatedData = { title, content };
        const data = await fetch(`${urls}/author-update?id=${postId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json());

        if (data) {
            toast.success("Post updated successfully");
            setIsEditing(false);
            queryClient.invalidateQueries(['fetchPost', postId]);
        } else {
            toast.error("Failed to update post");
        }
    };

    if (isLoading) {
        return (
            <>
                <Skeleton />
                <div className="flex items-center justify-center h-screen">
                    <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#BB5A3A]"></div>
                    <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" className="rounded-full h-28 w-28" />
                </div>
            </>
        );
    }

    if (error) {
        return <div>Error</div>;
    }

    const handleSubmit = async (values: any) => {
        values.post_id = postId
        const val = await axios.post(`${urls}/comment`, values, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        if (val.data) {
            toast.success("comment posted successfully")
        } else {
            toast.error("error occured")
        }
    }

    return (
        <>
            <Toaster />
            <BackButton />

            <div className="w-4/5 mx-auto p-8">

                <div className="flex w-20 justify-center items-center m-2 text-white bg-[#BB5A3A] hover:bg-[#BB5A3A] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {data?.data?.category?.categories}
                </div>
                <div className="w-full rounded-xl mb-10">

                    <img src={data?.data?.image} alt="Uploaded Image" className="rounded-xl" />
                </div>
                <div className="space-y-6">
                    <h5 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400 leading-8">{content}</p>
                </div>

                <div className="bg-white  overflow-hidden">
                <div className="max-w-md w-full mt-10">
                    <h2 className="text-2xl font-semibold">Comment</h2>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        <Form className="mt-6 space-y-4">
                            <div>
                                <Field id="email" name="comment" type="text" placeholder="comment" className="mt-1 block w-full border-slate-500 border-2 rounded-md shadow-sm p-5" />
                                <ErrorMessage name="comment" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <button type="submit" className="py-2 px-4 text-sm bg-[#BB5A3A] text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300">Submit</button>
                        </Form>
                    </Formik>

                </div>
            </div>
            {comment?.slice(0, 5)?.map((item: any) => (
                <div id="toast-message-cta" className="w-full max-w-lg p-4 m-3 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400" role="alert">
                    <div className="flex m-5">
                        <img className="w-8 h-8 rounded-full" src="" alt="Jese Leos image" />
                        <div className="ms-3 text-sm font-normal">
                            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{item.id}</span>
                            <div className="mb-2 text-sm font-normal">{item.comment}</div>
                            <Link href="#" className="inline-flex px-2.5 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">Reply</Link>
                        </div>
                        <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-message-cta" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                </div>

            ))}
            </div>

            
        </>
    );
};

export default BlogDetails;