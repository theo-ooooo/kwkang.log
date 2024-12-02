import Modal from "@/components/modal/Modal";
import ArticlePage from "@/app/articles/[directory]/[id]/page";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page(props: any) {
  return (
    <Modal>
      <ArticlePage {...props} />
    </Modal>
  );
}
