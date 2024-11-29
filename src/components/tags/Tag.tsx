"use client";

import clsx from "clsx";

export default function Tag({
  tag,
  isSelected,
  onClick,
}: {
  tag: string;
  isSelected: boolean;
  onClick: (tag: string) => void;
}) {
  return (
    <div
      onClick={() => onClick(tag)}
      className={clsx(
        "px-4 py-1 mx-1 mb-2 text-xs whitespace-pre duration-300 rounded-xl text-white cursor-pointer",
        { "font-bold bg-sky-400 dark:bg-neutral-500": isSelected },
        { "font-semibold bg-sky-300 dark:bg-neutral-700": !isSelected }
      )}
    >
      {tag.toUpperCase()}
    </div>
  );
}
