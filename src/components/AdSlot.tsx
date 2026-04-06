/**
 * AdSlot — placeholder for future ad integration (Adsense / Ezoic / Mediavine).
 * Replace the inner content with your ad script when ready.
 */
export default function AdSlot({
  position,
  className = "",
}: {
  position: "top" | "mid" | "bottom" | "sidebar";
  className?: string;
}) {
  // In production, return null or the actual ad code.
  // Keeping the placeholder visible only in development.
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className={`ad-slot ${className}`} data-ad-position={position}>
      Emplacement pub — {position}
    </div>
  );
}
