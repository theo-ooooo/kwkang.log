"use client";

import clsx from "clsx";

export default function Tag({
  tag,
  isSelected,
  onClick,
  ref,
}: {
  tag: string;
  isSelected: boolean;
  onClick: (tag: string) => void;
  ref: (instance: HTMLDivElement) => void;
}) {
  return (
    <div
      ref={ref}
      onClick={() => onClick(tag)}
      className={clsx(
        "px-3.5 py-1.5 mx-0.5 text-xs whitespace-pre rounded-full cursor-pointer font-semibold transition-colors",
        {
          "bg-indigo-600 text-white": isSelected,
          "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700": !isSelected
        }
      )}
    >
      {tag.toUpperCase()}
    </div>
  );
}
