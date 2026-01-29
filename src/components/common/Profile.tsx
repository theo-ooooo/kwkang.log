import profile from "@/data/profile.json";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLink } from "react-icons/fa";

export default function Profile() {
  const { name, links, imageSrc } = profile;

  return (
    <div className='flex items-center gap-4 my-8 pb-8 border-b border-gray-200 dark:border-gray-800'>
      <Image
        src={imageSrc}
        alt='me'
        width={64}
        height={64}
        className='rounded-full'
        priority
      />
      <div className='w-full flex flex-col gap-2'>
        <p className='font-semibold text-lg dark:text-white'>{name}</p>
        <div className='flex gap-3'>
          {links.github && (
            <Link 
              href={links.github} 
              target='_blank'
              className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors'
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </Link>
          )}
          {links.blog && (
            <Link 
              href={links.blog} 
              target='_blank'
              className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors'
              aria-label="Blog"
            >
              <FaLink size={24} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
