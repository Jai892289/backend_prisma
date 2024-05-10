"use client";

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import React, { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';

interface LoginInitialData {
  email: string;
  password: string;
}

const Login: React.FC = () => {  
  
    const router = useRouter();

    const LoginSchema = Yup.object().shape({
        email: Yup.string().required("User Id is required"),
        password: Yup.string().required("Password is required"),
    });

    const [login, setLogin] = useState<any>();
    const [user, setUser] = useState<any>();

    const handleSubmit = async (values: LoginInitialData) => {
        try {
            const response = await axios.post("http://localhost:4000/login", values)
            const token = response.data.token;
            const user = jwtDecode(token); 
            // sessionStorage.setItem("user_login", JSON.stringify(token))
            setLogin(response.data)
            setUser(user)
            if (response.data) {
             Cookies.set("token", response?.data?.token);
                toast.success(`User Logged in Succesfully !`)
                router.push('/blog');

            }
        } catch (err) {
            console.log("err", err)
             toast.error(`User Not Found !`)

        }
    }

    const [initialValues, setInitialValues] = useState<LoginInitialData>({
        email: '',
        password: ''
    });

    console.log("user12", user)

    // const notify = () => toast.success('Here is your toast.');

    // if (login) {
    //  toast.success(`User Logged in Succesfully !`);

    // }

    return (
        <>
            <Toaster />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full px-6 py-8 bg-white border rounded-md shadow-lg">
                <h2 className="text-2xl font-semibold text-center">Login</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className="mt-6 space-y-4">
                        <div>
                            <label htmlFor="email" className="block">User ID</label>
                            <Field id="email" name="email" type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />

                        </div>
                        <div>
                            <label htmlFor="password" className="block">Password</label>
                            <Field id="password" name="password" type="password" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />

                        </div>
                        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300">Submit</button>
                    </Form>
                </Formik>
                <div className="mt-4 text-center">
                    <span className="text-blue-500 cursor-pointer hover:underline">Forgot Password</span>
                    </div>
                          {/* <button onClick={notify}>Make me a toast</button>
 */}
            </div>
            </div>
            
            {/* {login ? router.push('/blog') : "Error "} */}
        </>
    );
};


export default Login