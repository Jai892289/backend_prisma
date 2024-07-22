import React from 'react'

export const BackButton = () => {
     const handleBack = () => {
        window.history.back();
    };
  return (
      <div className='mt-6'>
           <button
                type="button"
                onClick={handleBack}
                className="flex items-center m-2 text-white bg-[#BB5A3A] hover:bg-[#BB5A3A] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                <svg
                    className="w-4 h-4 mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
                <span>Back</span>
            </button>
    </div>
  )
}

