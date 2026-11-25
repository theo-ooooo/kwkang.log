"use client";

import { useState } from "react";

/** 처음 두 문단만 보이고 나머지는 접어 둔다 */
export default function MoreText({ paragraphs }: { paragraphs: string[] }) {
  const [open, setOpen] = useState(false);
  const shown = open ? paragraphs : paragraphs.slice(0, 2);
  return (
    <div className="pf-about-text">
      {shown.map((p, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
      ))}
      {paragraphs.length > 2 && (
        <button type="button" className="pf-more" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? "접기" : "소개 더 읽기"}
        </button>
      )}
    </div>
  );
}
