import { Article } from "@/types/article";
import Link from "next/link";

export default function ArticleDescView({ article }: { article: Article }) {
  return (
    <Link 
      href={`${article.route}`} 
      className='group relative flex flex-col w-full gap-5 p-7 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border border-gray-200/60 dark:border-gray-800/60 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 ease-out overflow-hidden'
    >
      {/* 그라데이션 액센트 */}
      <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
      
      <div className='flex flex-col gap-4'>
        <h2 className='w-full text-base font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 dark:group-hover:from-blue-400 dark:group-hover:via-purple-400 dark:group-hover:to-pink-400 transition-all duration-500'>
          {article.title}
        </h2>
        <div className='flex justify-between items-center gap-3 flex-wrap'>
          <div className='text-sm font-medium text-gray-500 dark:text-gray-400 px-3 py-1 rounded-full bg-gray-100/50 dark:bg-gray-800/50'>
            {article.date}
          </div>
          <div className='flex gap-2 flex-wrap'>
            {article.tags.map((tag) => {
              return (
                <span 
                  key={tag} 
                  className='px-3 py-1.5 text-xs font-bold rounded-full text-gray-700 dark:text-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200/50 dark:border-blue-800/50 shadow-sm group-hover:scale-110 transition-transform duration-300'
                >
                  {tag.toUpperCase()}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <p className='text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2 text-sm'>{article.description}...</p>
      
      {/* 호버 시 나타나는 화살표 */}
      <div className='absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        <svg className='w-6 h-6 text-blue-500 dark:text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
        </svg>
      </div>
    </Link>
  );
}
