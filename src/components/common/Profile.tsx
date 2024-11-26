import profile from "@/data/profile.json";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { RiNotionFill } from "react-icons/ri";

export default function Profile() {
  const { name, link, ImageSrc } = profile;

  return (
    <div className='flex items-center gap-4 my-4'>
      <Image
        src={ImageSrc}
        alt='me'
        width={64}
        height={64}
        className='rounded-full'
        priority
      />
      <div className='w-full flex flex-col gap-2'>
        <p className='font-semibold'>{name}</p>
        <div className='flex gap-2'>
          {Object.entries(link).map(([name, href]) => (
            <Link href={href} key={name}>
              {name === "github" ? (
                <FaGithub size={20} />
              ) : (
                <RiNotionFill size={20} />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
