"use client";

import { InlineMath, BlockMath } from "react-katex";

interface MathRendererProps {
  text: string;
  className?: string;
}

type Segment =
  | { type: "block"; content: string }
  | { type: "inline"; content: string }
  | { type: "text"; content: string };

function parseSegments(text: string): Segment[] {
  const segments: Segment[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    const blockIdx = remaining.indexOf("$$");
    const inlineIdx = remaining.indexOf("$");

    if (blockIdx === -1 && inlineIdx === -1) {
      segments.push({ type: "text", content: remaining });
      break;
    }

    if (blockIdx !== -1 && (inlineIdx === -1 || blockIdx <= inlineIdx)) {
      if (blockIdx > 0) {
        segments.push({ type: "text", content: remaining.slice(0, blockIdx) });
      }
      const end = remaining.indexOf("$$", blockIdx + 2);
      if (end === -1) {
        segments.push({ type: "text", content: remaining });
        break;
      }
      segments.push({
        type: "block",
        content: remaining.slice(blockIdx + 2, end),
      });
      remaining = remaining.slice(end + 2);
    } else {
      if (inlineIdx > 0) {
        segments.push({ type: "text", content: remaining.slice(0, inlineIdx) });
      }
      const end = remaining.indexOf("$", inlineIdx + 1);
      if (end === -1) {
        segments.push({ type: "text", content: remaining });
        break;
      }
      segments.push({
        type: "inline",
        content: remaining.slice(inlineIdx + 1, end),
      });
      remaining = remaining.slice(end + 1);
    }
  }

  return segments;
}

export default function MathRenderer({ text, className }: MathRendererProps) {
  const segments = parseSegments(text);

  return (
    <span className={className}>
      {segments.map((seg, i) => {
        if (seg.type === "block") {
          return (
            <span key={i} className="block my-2">
              <BlockMath math={seg.content} />
            </span>
          );
        }
        if (seg.type === "inline") {
          return <InlineMath key={i} math={seg.content} />;
        }
        return <span key={i}>{seg.content}</span>;
      })}
    </span>
  );
}
