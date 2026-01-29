import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className='flex justify-center text-sm max-w-[768px] mx-auto py-8 mt-12 border-t border-gray-200 dark:border-gray-800'>
      <span className='text-gray-500 dark:text-gray-500'>© {year}</span>
      <Link
        href={"https://github.com/theo-ooooo"}
        target='_blank'
        className='ml-2 font-medium text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors'
      >
        THEO
      </Link>
    </footer>
  );
}
