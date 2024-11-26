export interface Article {
  title: string;
  date: string;
  content: string;
  description?: string;
  tags: string[];
  route?: string;
}
