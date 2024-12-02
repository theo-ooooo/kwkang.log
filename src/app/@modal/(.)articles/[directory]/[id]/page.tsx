import Modal from "@/components/modal/Modal";
import ArticlePage from "@/app/articles/[directory]/[id]/page";

export default function Page(props: any) {
  return (
    <Modal>
      <ArticlePage {...props} />
    </Modal>
  );
}
