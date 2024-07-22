import Link from 'next/link';

type BlogCardProps = {
  title?: string;
  content?: string;
  slug?: string;
  image?: string;
  alt?: string;
  path?: string;
  buttonName?: string;
};

const BlogCard = ({ title, content, image, slug, alt, path, buttonName }: BlogCardProps) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3">
     <img className="rounded-t-lg w-full h-[20rem]" src={image} alt={alt}/>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">{title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-1">{content}</p>
          <Link href={`/${path}/${slug}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#BB5A3A] rounded-lg hover:bg-[#61463d] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {buttonName}
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </Link>
      </div>
    </div>

  );
};

export default BlogCard;
