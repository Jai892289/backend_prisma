"use client"
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {

    const [datas, setChatData] = useState<any>()

    const fetchComment = async () => {
        const res = await fetch(`http://localhost:4000/auth/api/v1/cart-all-day`)
        .then(res => res.json());
        setChatData(res)
    };

    useEffect(() => {
        fetchComment()
    }, [])

    const totalOrders = datas?.data
     

  const formattedDate = new Date().toISOString().slice(0, 10);

    console.log("formattedDate", formattedDate)

    const filteredOrders = totalOrders?.filter((i: any) => i.created_at < formattedDate);
    console.log("filteredOrders", filteredOrders);

    const uniqueDates = Array.from(new Set(filteredOrders?.map((order: any) => 
        new Date(order.created_at).toISOString().slice(0, 10)
    )));

    const uniqueDate = Array.from(new Set(filteredOrders?.map((order: any) => order.amount
    )));

    console.log("uniqueDate", uniqueDate)


    

    const data = {
        // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        labels:[uniqueDates],
        datasets: [
            {
                label: 'Dataset 1',
                data: [65],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
             {
                label: 'Dataset 1',
                data: [65],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
              {
                label: 'Dataset 1',
                data: [65],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            
        ],
    };

    const options: any = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Bar Chart Example',
            },
        },
    };

    return (
        <>
            <div >
                <Bar data={data} options={options} />
            </div>
        </>
    )
};

export default BarChart;
