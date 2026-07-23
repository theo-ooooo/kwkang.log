import profile from "@/data/profile.json";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLink } from "react-icons/fa";

export default function Profile() {
  const { name, role, description, links, imageSrc } = profile;

  return (
    <section className='flex flex-col items-center py-10 text-center'>
      <Image
        src={imageSrc}
        alt='me'
        width={84}
        height={84}
        className='rounded-full object-cover ring-1 ring-gray-200 dark:ring-gray-700'
        priority
      />
      <h1 className='mt-4 text-2xl font-extrabold tracking-tight dark:text-white'>
        {name}
      </h1>
      <p className='mt-1.5 text-sm text-gray-500 dark:text-gray-400'>
        {role} · {description}
      </p>
      <div className='mt-4 flex gap-4 text-gray-400 dark:text-gray-500'>
        {links.github && (
          <Link
            href={links.github}
            target='_blank'
            aria-label='GitHub'
            className='transition-colors hover:text-gray-900 dark:hover:text-white'
          >
            <FaGithub size={20} />
          </Link>
        )}
        {links.blog && (
          <Link
            href={links.blog}
            target='_blank'
            aria-label='Blog'
            className='transition-colors hover:text-gray-900 dark:hover:text-white'
          >
            <FaLink size={20} />
          </Link>
        )}
      </div>
    </section>
  );
}
