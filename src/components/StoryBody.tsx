import type { StoryParagraph } from "@/lib/types";
import AdSlot from "./AdSlot";

export default function StoryBody({
  content,
}: {
  content: StoryParagraph[];
}) {
  const midIndex = Math.floor(content.length / 2);

  return (
    <div className="prose-story">
      {content.map((block, i) => (
        <div key={i}>
          <p>{block.paragraph}</p>
          {/* Insert mid-article ad after the midpoint paragraph */}
          {i === midIndex && <AdSlot position="mid" />}
        </div>
      ))}
    </div>
  );
}
