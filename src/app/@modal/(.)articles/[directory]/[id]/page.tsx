import Modal from "@/components/modal/Modal";
import ArticlePage from "@/app/articles/[directory]/[id]/page";
import { MdOutlineUnfoldMore } from "react-icons/md";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page(props: any) {
  const params = await props.params;
  return (
    <Modal>
      <div className='flex w-full justify-end'>
        <a className='flex' href={`/articles/${params.directory}/${params.id}`}>
          <MdOutlineUnfoldMore size={20} className='rotate-45' />
        </a>
      </div>
      <ArticlePage {...props} />
    </Modal>
  );
}
