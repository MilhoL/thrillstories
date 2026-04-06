import { GENRES } from "@/lib/types";

export default function GenrePill({ genre }: { genre: string }) {
  const found = GENRES.find((g) => g.slug === genre);
  const color = found?.color ?? "#7E57C2";
  const label = found?.label ?? genre;

  return (
    <span
      className="genre-pill"
      style={{
        backgroundColor: `${color}15`,
        color,
      }}
    >
      {label}
    </span>
  );
}
