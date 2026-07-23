import profile from "@/data/profile.json";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLink } from "react-icons/fa";

export default function Profile() {
  const { name, role, description, links, imageSrc } = profile;

  return (
    <section className='relative my-8 overflow-hidden rounded-3xl border border-gray-100 bg-white p-7 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8'>
      {/* 부드러운 액센트 */}
      <div className='pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-100/70 blur-3xl dark:bg-indigo-500/10' />

      <div className='relative flex items-center gap-5'>
        <Image
          src={imageSrc}
          alt='me'
          width={80}
          height={80}
          className='shrink-0 rounded-2xl object-cover ring-1 ring-gray-200 dark:ring-gray-700'
          priority
        />
        <div className='flex flex-col gap-2'>
          <span className='inline-flex w-fit items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300'>
            {role}
          </span>
          <h1 className='text-2xl font-extrabold tracking-tight dark:text-white'>
            안녕하세요, {name}입니다 👋
          </h1>
          <p className='text-sm leading-relaxed text-gray-500 dark:text-gray-400'>
            {description}
          </p>
          <div className='mt-1.5 flex gap-2'>
            {links.github && (
              <Link
                href={links.github}
                target='_blank'
                aria-label='GitHub'
                className='flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-900 hover:text-white dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white dark:hover:text-gray-900'
              >
                <FaGithub size={18} />
              </Link>
            )}
            {links.blog && (
              <Link
                href={links.blog}
                target='_blank'
                aria-label='Blog'
                className='flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-900 hover:text-white dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white dark:hover:text-gray-900'
              >
                <FaLink size={18} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
