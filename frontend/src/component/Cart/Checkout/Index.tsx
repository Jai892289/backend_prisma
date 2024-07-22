// "use client"
// import Confirmation from '@/global/confirmation';
// import confirmation from '@/global/confirmation';
// import { clearCart } from '@/redux/authSlice';
// import { urls } from '@/utils/baseUrl';
// import axios from 'axios';
// import { ErrorMessage, Field, Form, Formik } from 'formik'
// import React, { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux';
// import * as Yup from "yup";


// const Checkout = () => {
//     const dispatch = useDispatch()

//     const [showConfirmation, setShowConfirmation] = useState(false);

//     const { cart, totalQuantity, totalAmount, prod, status, error, fat, user } = useSelector((state: any) => state.auth)
//     const items = useSelector((state: any) => state?.auth)
    
//     console.log("user32", user)

//      const pickup = Math.round(totalAmount >= 2000 ? 99 : 199)

//     const calculateTax = (totalAmount: any) => {
//         let taxRate;

//         if (totalAmount < 1000) {
//             taxRate = 0.05; // 5% tax
//         } else if (totalAmount >= 1000 && totalAmount < 4000) {
//             taxRate = 0.1; // 10% tax
//         } else {
//             taxRate = 0.15; // 15% tax
//         }

//         const tax = Math.round(totalAmount * taxRate);
//         return tax;
//     };

//      const handleSubmit = async (values: any) => {
//          console.log("Form values:", values);
//          try {
             
//              const response = await axios.post(`http://localhost:4000/auth/api/v1/cart-create`, values);

//             if (response.data) {
//                 console.log("res", response.data);
//                 setShowConfirmation(true)
//                 dispatch(clearCart());
//                 // alert("Order placed Succesfully")
//             }
//          } catch (err) {
//              console.log("err", err)
//          }
//     }

//     const totalAmountCart = (totalAmount >= 5000 ? totalAmount * 0.95 : totalAmount * 1 + pickup + calculateTax(totalAmount)).toFixed(2)

//     const [initialValues, setInitialValues] = useState<any>({
//         name: '',
//         address1: '',
//         address2: '',
//         landmark: '',
//         state: '',
//         pincode: '',
//         total: totalAmountCart,
//         userName: user.name,
//         userEmail: user.email,
//         userId:user.id
//     });

//     return (

//         <div>
//             <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
//                 <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
//                     <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
//                         <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
//                             <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
//                                 <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//                                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
//                                 </svg>
//                                 Cart
//                             </span>
//                         </li>

//                         <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
//                             <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
//                                 <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//                                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
//                                 </svg>
//                                 Checkout
//                             </span>
//                         </li>

//                         <li className="flex shrink-0 items-center">
//                             <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
//                             </svg>
//                             Order summary
//                         </li>
//                     </ol>

//                     {showConfirmation ? <Confirmation /> : (

                    
//                     <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
//                         <div className="min-w-0 flex-1 space-y-8">
//                             <div className="space-y-4">
//                                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Details</h2>

//                                 <Formik
//                                     initialValues={initialValues}
//                                     // validationSchema={LoginSchema}
//                                     onSubmit={handleSubmit}
//                                 >
//                                     <Form>
//                                         <div>
//                                             <section className="bg-gray-50 dark:bg-gray-900">
//                                                 <div className="flex flex-col items-center justify-center mx-auto lg:py-0">

//                                                     <div className="w-full bg-white dark:bg-gray-800 dark:border-gray-700">
//                                                         <div className="grid grid-cols-2 gap-4 m-2">
                                                            
//                                                             <div>
//                                                                 <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
//                                                                 <Field type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
//                                                                 {/* <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" /> */}
//                                                             </div>
//                                                             <div>
//                                                                 <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address1</label>
//                                                                 <Field type="text" name="address1" placeholder="Enter your Address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//                                                                 {/* <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" /> */}
//                                                             </div>
//                                                             <div>
//                                                                 <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address2</label>
//                                                                 <Field type="text" name="address2" placeholder="Enter your Address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//                                                                 {/* <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" /> */}
//                                                             </div>
//                                                             <div>
//                                                                 <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Landmark</label>
//                                                                 <Field type="text" name="landmark" placeholder="Enter your Address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//                                                                 {/* <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" /> */}
//                                                             </div>
//                                                             <div>
//                                                                 <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
//                                                                 <Field type="text" name="state" placeholder="Enter your Address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//                                                                 {/* <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" /> */}
//                                                             </div>
//                                                             <div>
//                                                                 <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pin Code</label>
//                                                                 <Field type="text" name="pincode" placeholder="Enter your Address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//                                                                 {/* <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" /> */}
//                                                             </div>
                                                           
//                                                         </div>
//                                                          {/* <button type="submit" className="bg-[#BB5A3A] p-3 text-white cursor-pointer mt-4 mb-4 w-full inline-flex items-center justify-center">Order Now</button> */}
//                                 <button type="submit" className='bg-[#BB5A3A] p-3 text-white cursor-pointer mt-4 mb-4 w-full inline-flex items-center justify-center'>Confirm Order</button>

//                                                     </div>
//                                                 </div>
//                                             </section>
//                                         </div>
//                                     </Form>
//                                 </Formik>
//                             </div>
//                         </div>

//                         <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
//                             <div className="flow-root">
//                                 <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
//                                     <dl className="flex items-center justify-between gap-4 py-3">
//                                         <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Subtotal</dt>
//                                         <dd className="text-base font-medium text-gray-900 dark:text-white">${totalAmount}</dd>
//                                     </dl>

//                                     <dl className="flex items-center justify-between gap-4 py-3">
//                                         <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
//                                         <dd className="text-base font-medium text-green-500">
//                                          ${totalAmount - Math.round(totalAmount >= 5000 ? totalAmount * 0.95 : totalAmount * 1)}

//                                         </dd>
//                                     </dl>

//                                     <dl className="flex items-center justify-between gap-4 py-3">
//                                         <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
//                                         <dd className="text-base font-medium text-gray-900 dark:text-white">${pickup}</dd>
//                                     </dl>

//                                     <dl className="flex items-center justify-between gap-4 py-3">
//                                         <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
//                                         <dd className="text-base font-medium text-gray-900 dark:text-white">${calculateTax(totalAmount)}</dd>
//                                     </dl>

//                                     <dl className="flex items-center justify-between gap-4 py-3">
//                                         <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
//                                         <dd className="text-base font-bold text-gray-900 dark:text-white">
//                                             ${totalAmountCart}
//                                         </dd>
//                                     </dl>
//                                 </div>
//                             </div>

//                             <div className="space-y-3">
//                                 {/* <button type="submit" className='bg-[#BB5A3A] p-3 text-white cursor-pointer mt-4 mb-4 w-full inline-flex items-center justify-center'>Proceed to Payment</button> */}

//                                 <p className="text-sm font-normal text-gray-500 dark:text-gray-400">One or more items in your cart require an account. <a href="#" title="" className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Sign in or create an account now.</a>.</p>
//                             </div>
//                         </div>
//                         </div>
//                         )}
//                 </div>
//             </section>
//         </div>
//     )
// }

// export default Checkout


// Checkout.tsx
"use client"
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import stripePromise from '@/global/stripe';
import Confirmation from '@/global/confirmation';
import { clearCart } from '@/redux/authSlice';
import { urls } from '@/utils/baseUrl';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from "yup";


const CheckoutForm = ({ setShowConfirmation }: { setShowConfirmation: (show: boolean) => void }) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const { totalAmount, user } = useSelector((state: any) => state.auth);

    const handleSubmit = async (values: any) => {
        const cardElement = elements?.getElement(CardElement);

        if (!stripe || !cardElement) {
            return;
        }

        try {
            const { data: clientSecret } = await axios.post('hhttp://localhost:4000/auth/api/v1/create-payment-intent', {
                amount: totalAmount,
                currency: 'usd'
            });

            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: values.name,
                        email: user.email,
                    },
                },
            });

            if (error) {
                console.log("Payment error:", error);
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                console.log("Payment successful:", paymentIntent);
                setShowConfirmation(true);
                dispatch(clearCart());
                // Redirect to success page
                window.location.href = '/success';
            }
        } catch (err) {
            console.log("Payment error:", err);
        }
    }

    return (
        <Formik
            initialValues={{
                name: '',
                address1: '',
                address2: '',
                landmark: '',
                state: '',
                pincode: '',
            }}
            // validationSchema={LoginSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                {/* Delivery Details Form */}
                <div>
                    <section className="bg-gray-50 dark:bg-gray-900">
                        <div className="flex flex-col items-center justify-center mx-auto lg:py-0">
                            <div className="w-full bg-white dark:bg-gray-800 dark:border-gray-700">
                                <div className="grid grid-cols-2 gap-4 m-2">
                                    {/* Form Fields */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <Field type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address1</label>
                                        <Field type="text" name="address1" placeholder="Enter your Address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address2</label>
                                        <Field type="text" name="address2" placeholder="Enter your Address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Landmark</label>
                                        <Field type="text" name="landmark" placeholder="Enter your Address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
                                        <Field type="text" name="state" placeholder="Enter your Address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pin Code</label>
                                        <Field type="text" name="pincode" placeholder="Enter your Address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Stripe Payment Element */}
                <div className="my-4">
                    <CardElement className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>

                <button type="submit" className='bg-[#BB5A3A] p-3 text-white cursor-pointer mt-4 mb-4 w-full inline-flex items-center justify-center'>Confirm Order</button>
            </Form>
        </Formik>
    );
};

const Checkout = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { totalAmount } = useSelector((state: any) => state.auth);

    const totalAmountCart = (totalAmount >= 5000 ? totalAmount * 0.95 : totalAmount * 1).toFixed(2);

    return (
        <div>
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
                        <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                            <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                                <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                Cart
                            </span>
                        </li>

                        <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                            <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                                <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                Checkout
                            </span>
                        </li>

                        <li className="flex shrink-0 items-center">
                            <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Order summary
                        </li>
                    </ol>

                    {showConfirmation ? <Confirmation /> : (
                        <Elements stripe={stripePromise}>
                            <CheckoutForm setShowConfirmation={setShowConfirmation} />
                        </Elements>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Checkout;
