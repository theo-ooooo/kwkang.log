"use client";

import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function Introduction({ paragraphs }: { paragraphs: string[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="introduction-copy">
      {paragraphs.slice(0, 2).map((paragraph, index) => (
        <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
      ))}
      {paragraphs.length > 2 && (
        <>
          <div id="introduction-extra" className="introduction-extra" hidden={!expanded}>
            {paragraphs.slice(2).map((paragraph, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>
          <button type="button" className="text-button introduction-toggle" aria-expanded={expanded} aria-controls="introduction-extra" onClick={() => setExpanded(!expanded)}>
            {expanded ? "소개 접기" : "소개 더 보기"}
            {expanded ? <FiMinus aria-hidden="true" /> : <FiPlus aria-hidden="true" />}
          </button>
        </>
      )}
    </div>
  );
}
