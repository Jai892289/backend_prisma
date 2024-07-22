"use client"

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import BarChart from './BarChart';
import { urls } from '@/utils/baseUrl';
import { useScrollTo } from 'react-scroll-to-bottom';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {

    const [datas, setChatData] = useState<any>()

    const fetchComment = async () => {
        const res = await fetch(`http://localhost:4000/auth/api/v1/cart-all`)
            .then(res => res.json());
        setChatData(res)
    };

    useEffect(() => {
        fetchComment()
    }, [])

    console.log("data", datas)

    const totalOrders = datas?.data || [];

    const lowTotal = totalOrders.filter((order:any) => parseFloat(order.total) < 2000).length;
    const midTotal = totalOrders.filter((order:any) => parseFloat(order.total) >= 2000 && parseFloat(order.total) < 4000).length;
    const highTotal = totalOrders.filter((order:any) => parseFloat(order.total) >= 4000).length;

    
    console.log("lowTotal", lowTotal)

    const dataa = {
        labels: ['Total Order'],
        datasets: [
            {
                label: 'No. of Orders',
                data: [lowTotal, midTotal, highTotal],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <div className="grid grid-cols-3 gap-4 m-8">
                <div className='w-[35rem]'><Pie data={dataa} /></div>
                <div className='w-[70rem] h-[160rem]'><BarChart /></div>
            </div>
        </>
    )
}

export default Dashboard;
