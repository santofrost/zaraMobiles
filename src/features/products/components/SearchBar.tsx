interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultsCount: number;
}

export default function SearchBar({
  value,
  onChange,
  resultsCount,
}: SearchBarProps) {
  return (
    <div className="w-full px-4 pt-6 pb-4 sm:px-8">
      <input
        id="search-input"
        type="text"
        placeholder="Search for a smartphone..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b-2 border-[var(--toolbar-bg)] bg-transparent pb-2 text-sm text-gray-800 outline-none placeholder:text-gray-400 sm:text-base"
      />
      <p className="mt-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
        {resultsCount} results
      </p>
    </div>
  );
}
