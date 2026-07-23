// 카테고리(태그)별 포인트 컬러. Tailwind purge 안전하게 정적 클래스 문자열로 관리.
const TAG_COLORS: Record<string, string> = {
  ai: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
  llm: "bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  rag: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  transformer: "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  tokenizer: "bg-cyan-50 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300",
  embedding: "bg-teal-50 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300",
  prompt: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  finetuning: "bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
  lora: "bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
  reasoning: "bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-500/15 dark:text-fuchsia-300",
  agent: "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  mcp: "bg-purple-50 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300",
  pgvector: "bg-green-50 text-green-700 dark:bg-green-500/15 dark:text-green-300",
  evaluation: "bg-lime-50 text-lime-700 dark:bg-lime-500/15 dark:text-lime-300",
  hallucination: "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-300",
  security: "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-300",
  multimodal: "bg-pink-50 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300",
  springboot: "bg-green-50 text-green-700 dark:bg-green-500/15 dark:text-green-300",
  kotlin: "bg-purple-50 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300",
  typescript: "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  react: "bg-cyan-50 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300",
  "next.js": "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  mysql: "bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  node: "bg-green-50 text-green-700 dark:bg-green-500/15 dark:text-green-300",
  devops: "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-300",
};

const FALLBACK = "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";

export function tagColor(tag: string): string {
  return TAG_COLORS[tag.toLowerCase()] ?? FALLBACK;
}
