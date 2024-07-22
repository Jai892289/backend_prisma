
"use client"
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useQuery } from 'react-query';

const Sidebar = ({ onCategoryClick }:any) => {
  const token = Cookies.get("token");
  const [categories, setCategories] = useState<any>([]);

  const fetchData = async () => {
    const response = await fetch(`http://localhost:4000/all-category`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  };

  const { isLoading, data, error } = useQuery('fetchData', fetchData);

  useEffect(() => {
    if (data) {
      setCategories(data.data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <>
        <h2>Loading ...</h2>
      </>
      // <div className="flex items-center justify-center h-screen">
      //   <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
      //   <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" className="rounded-full h-28 w-28" />
      // </div>
    );
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr className='font-bold'>Categories</tr>
        </thead>
        <tbody>
          {categories?.map((item: any) => (
            <tr key={item.id} className='cursor-pointer' onClick={() => onCategoryClick(item.id)}>
              <td>{item.categories}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sidebar;
