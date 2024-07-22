"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { login, logout } from "@/redux/authSlice";
import Chat from "@/global/chatBot";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { speakError } from "@/global/speakMessage";

interface LoginInitialData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const LoginSchema = Yup.object().shape({
        email: Yup.string().required("User Id is required"),
        password: Yup.string().required("Password is required"),
    });

    const [user, setUser] = useState<any>();

    const handleSubmit = async (values: LoginInitialData) => {
        try {
            const response = await axios.post("http://localhost:4000/auth/api/v1/login", values)
            console.log("values", values)

            const token = response.data.data.token;
            console.log("token", token)
            const user = jwtDecode(token);
            setUser(user)
            sessionStorage.setItem('user', JSON.stringify(user));
            dispatch(login(user));

            if (response.data.data.token) {
                Cookies.set("token", response?.data);
                toast.success(`User Logged in Succesfully !`)
                router.replace('/home');
                speakError('User Logged in Succesfully !');

            }
        } catch (err) {
            console.log("err", err)
            toast.error(`User Not Found !`)
            speakError('Incorrect password. Please try again.');

        }
    }

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const [initialValues, setInitialValues] = useState<LoginInitialData>({
        email: '',
        password: ''
    });


    return (
        <>
            <Toaster />
            <Formik
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div>
                        <section className="bg-gray-50 dark:bg-gray-900">
                            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                        <h1 className="flex justify-center items-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white ">
                                            Sign in to your account
                                        </h1>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                            <Field type="text" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                            <Field type="password" name="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label className="text-gray-500 dark:text-gray-300">Remember me</label>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="w-full text-white bg-red-400  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                            Don’t have an account yet?
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </Form>
            </Formik>

            <div className="App">
                {/* <FloatingWhatsApp
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
                /> */}

                <Chat />
            </div>

        </>
    );
};

export default Login

// "use client";

// import React, { useEffect, useState, FormEvent } from "react";
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from "yup";
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import jwtDecode from 'jwt-decode';
// import toast, { Toaster } from 'react-hot-toast';
// import Cookies from 'js-cookie';
// import { useDispatch } from 'react-redux';
// import { login } from "@/redux/authSlice";
// import Chat from "@/global/chatBot";
// import { FloatingWhatsApp } from "react-floating-whatsapp";


// interface LoginInitialData {
//     email: string;
//     password: string;
// }

// const Login: React.FC = () => {
//     const dispatch = useDispatch();
//     const router = useRouter();

//     const LoginSchema = Yup.object().shape({
//         email: Yup.string().required("User Id is required"),
//         password: Yup.string().required("Password is required"),
//     });

//     const [user, setUser] = useState<any>();

//     const handleSubmit = async (values: LoginInitialData) => {
//         try {
//             const response = await axios.post("http://localhost:4000/auth/api/v1/login", values);
//             console.log("values", values);

//             const token = response.data.data.token;
//             console.log("token", token);
//             const user = jwtDecode(token);
//             setUser(user);
//             sessionStorage.setItem('user', JSON.stringify(user));
//             dispatch(login(user));

//             if (response.data.data.token) {
//                 Cookies.set("token", response?.data);
//                 toast.success(`User Logged in Successfully!`);
//                 router.replace('/home');
//             }
//         } catch (err) {
//             console.log("err", err);
//             toast.error(`User Not Found!`);
//             speakError('Incorrect password. Please try again.');
//         }
//     };

//     const speakError = (message: string) => {
//         if ('speechSynthesis' in window) {
//             const synth = window.speechSynthesis;
//             const utterThis = new SpeechSynthesisUtterance(message);
//             synth.speak(utterThis);
//         } else {
//             console.error('Text-to-speech is not supported in this browser.');
//         }
//     };

//     useEffect(() => {
//         const storedUser = sessionStorage.getItem('user');
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         }
//     }, []);

//     const [initialValues, setInitialValues] = useState<LoginInitialData>({
//         email: '',
//         password: ''
//     });

//     return (
//         <>
//             <Toaster />
//             <Formik
//                 initialValues={initialValues}
//                 validationSchema={LoginSchema}
//                 onSubmit={handleSubmit}
//             >
//                 <Form>
//                     <div>
//                         <section className="bg-gray-50 dark:bg-gray-900">
//                             <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

//                                 <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//                                     <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                                         <h1 className="flex justify-center items-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white ">
//                                             Sign in to your account
//                                         </h1>
//                                         <div>
//                                             <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
//                                             <Field type="text" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
//                                             <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
//                                         </div>
//                                         <div>
//                                             <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
//                                             <Field type="password" name="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//                                             <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
//                                         </div>
//                                         <div className="flex items-center justify-between">
//                                             <div className="flex items-start">
//                                                 <div className="flex items-center h-5">
//                                                     <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
//                                                 </div>
//                                                 <div className="ml-3 text-sm">
//                                                     <label className="text-gray-500 dark:text-gray-300">Remember me</label>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <button type="submit" className="w-full text-white bg-red-400  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
//                                         <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                                             Don’t have an account yet?
//                                         </p>

//                                     </div>
//                                 </div>
//                             </div>
//                         </section>
//                     </div>
//                 </Form>
//             </Formik>

//             <div className="App">
//                 {/* <FloatingWhatsApp
//                     phoneNumber="7366042663"
//                     accountName="Help Desk"
//                     chatMessage={
//                         "Hello there! How can we help?\n" +
//                         "You can ask us about our services.\n" +
//                         "Feel free to reach out anytime."
//                     }
//                     notification
//                     notificationSound
//                 /> */}

//                 <Chat />
//             </div>
//         </>
//     );
// };

// export default Login;
