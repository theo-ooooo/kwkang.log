import profile from "@/data/profile.json";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLink } from "react-icons/fa";

export default function Profile() {
  const { name, role, description, links, imageSrc } = profile;

  return (
    <div className='flex items-center gap-5 my-10 pb-10 border-b border-gray-100 dark:border-gray-800'>
      <Image
        src={imageSrc}
        alt='me'
        width={72}
        height={72}
        className='rounded-full ring-1 ring-gray-200 dark:ring-gray-700'
        priority
      />
      <div className='w-full flex flex-col gap-1.5'>
        <p className='font-bold text-2xl tracking-tight dark:text-white'>{name}</p>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          <span className='font-semibold text-indigo-600 dark:text-indigo-400'>{role}</span>
          {" · "}
          {description}
        </p>
        <div className='flex gap-3 mt-1.5'>
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
