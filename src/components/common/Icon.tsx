interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

const icons: Record<string, string> = {
  home: 'M3 12l9-8 9 8M5 12v7a1 1 0 001 1h3v-5h6v5h3a1 1 0 001-1v-7',
  cards: 'M4 6h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2zm2-2h12a2 2 0 012 2v8',
  book: 'M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5V5a2 2 0 012-2h14v14H6.5A2.5 2.5 0 004 19.5zM8 7h8M8 11h5',
  chat: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
  chart: 'M18 20V10M12 20V4M6 20v-6',
  flashcard: 'M3 7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7zm4-4h10a2 2 0 012 2v10',
};

export default function Icon({ name, size = 24, className }: IconProps) {
  const path = icons[name];
  if (!path) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={path} />
    </svg>
  );
}
