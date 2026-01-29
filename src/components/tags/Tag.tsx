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
        "px-4 py-1.5 mx-1 mb-2 text-xs whitespace-pre rounded-md cursor-pointer font-medium transition-colors",
        {
          "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900": isSelected,
          "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700": !isSelected
        }
      )}
    >
      {tag.toUpperCase()}
    </div>
  );
}
