import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className='flex justify-center text-sm max-w-[769px] mx-auto  py-2'>
      <span>© {year}</span>
      <Link
        href={"https://github.com/theo-ooooo"}
        target='_blank'
        className='ml-1 font-bold underline'
      >
        THEO
      </Link>
    </footer>
  );
}
