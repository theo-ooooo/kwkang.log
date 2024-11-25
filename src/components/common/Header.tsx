import Link from "next/link";

export default function Header() {
  return (
    <div className='flex justify-between p-3'>
      <Link href={"/"} className='font-bold text-lg underline'>
        THEO
      </Link>
    </div>
  );
}
