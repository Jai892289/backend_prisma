"use client"
import React, { useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import Cookies from 'js-cookie';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

interface initialPostBlog {
    title: string,
    content: string,
    // published: boolean,
    author_Id: number,
    image: string,
    category_id:number
}

const BlogPost = () => {

    const [user, setUser] = useState<any>();
    const [file, setFile] = useState<any>()
    const token = Cookies.get('token');

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        content: Yup.string().required('Content is required'),
        published: Yup.boolean(),
    });

    useEffect(() => {
        const value = sessionStorage.getItem("user")
        console.log("value", value)
        setUser(JSON.parse(value as string))
    }, [])

    const userId = user?.id

    const initalValue = {
        title: '',
        content: '',
        author_Id: 1,
        image: '',
        category_id: 1,
    }
    console.log("userId123", userId)

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (values: initialPostBlog) => {
        console.log("values", values);
        try {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('content', values.content);
            formData.append('author_Id', userId.toString());
            formData.append('category_id', values.category_id.toString());

            if (file) {
                formData.append('image', file);
            }

            console.log("file", file);

            const response = await axios.post("http://localhost:4000/post-data", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );

            if (response.data) {
                console.log("res", response.data);
                toast.success(`Successfully Saved!`);
            }
        } catch (err) {
            console.log("err", err);
            toast.error(`Some error occurred!`);
        }
    };

    return (
        <>
            <Toaster />
            <div className="flex justify-center items-center h-screen animate-pulse">
                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 p-6 rounded-lg shadow-lg bg-white">
                    <Formik
                        initialValues={initalValue}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <Form className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block">Title</label>
                                <Field id="title" name="title" type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                                <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div>
                                <label htmlFor="content" className="block">Content</label>
                                <Field id="content" name="content" type="content" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                                <ErrorMessage name="content" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                              <div>
                                 <label htmlFor="category_id" className="block">Category</label>
                                    <Field id="category_id" name="category_id" as="select" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                                     <option value="1">Category 1</option>
                                    <option value="2">Category 2</option>
                                    <option value="3">Category 3</option>
                                 </Field>
                                 <ErrorMessage name="category_id" component="div" className="text-red-500 text-sm mt-1" />
                             </div>
                            <div>
                                <input type="file" name="image" onChange={handleFileChange} />
                            </div>
                            <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300">Submit</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default BlogPost