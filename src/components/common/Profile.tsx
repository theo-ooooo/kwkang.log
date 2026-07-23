import profile from "@/data/profile.json";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLink } from "react-icons/fa";

export default function Profile() {
  const { name, role, description, links, imageSrc } = profile;

  return (
    <section className='relative my-8 overflow-hidden rounded-3xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900'>
      {/* 상단 배너 */}
      <div className='h-20 bg-gradient-to-r from-indigo-500/90 to-violet-500/90' />

      <div className='px-6 pb-6'>
        {/* 배너에 살짝 걸치는 아바타 */}
        <div className='-mt-10 flex items-end justify-between'>
          <Image
            src={imageSrc}
            alt='me'
            width={84}
            height={84}
            className='rounded-2xl object-cover ring-4 ring-white dark:ring-gray-900'
            priority
          />
          <div className='mb-1 flex gap-2'>
            {links.github && (
              <Link
                href={links.github}
                target='_blank'
                aria-label='GitHub'
                className='flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-900 hover:text-white dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white dark:hover:text-gray-900'
              >
                <FaGithub size={17} />
              </Link>
            )}
            {links.blog && (
              <Link
                href={links.blog}
                target='_blank'
                aria-label='Blog'
                className='flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-900 hover:text-white dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white dark:hover:text-gray-900'
              >
                <FaLink size={17} />
              </Link>
            )}
          </div>
        </div>

        <div className='mt-3 flex items-center gap-2'>
          <h1 className='text-xl font-extrabold tracking-tight dark:text-white'>{name}</h1>
          <span className='rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-bold text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300'>
            {role}
          </span>
        </div>
        <p className='mt-1.5 text-sm leading-relaxed text-gray-500 dark:text-gray-400'>
          {description}
        </p>
      </div>
    </section>
  );
}
