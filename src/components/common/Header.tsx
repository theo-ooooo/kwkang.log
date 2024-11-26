import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className='flex  p-3 max-w-[768px] sticky mx-auto top-0 bg-white'>
      <Link href={"/"} className='font-bold text-lg underline'>
        <Image src={"/images/logo.png"} width={38} height={38} alt='logo' />
      </Link>
    </div>
  );
}
