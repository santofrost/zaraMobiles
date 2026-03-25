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
    <div className="sticky top-toolbar z-40 bg-white w-full px-4 pt-4 pb-2 sm:px-8">
      <input
        id="search-input"
        type="text"
        placeholder="Search for a smartphone..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-gray-300 bg-transparent pb-3 text-sm text-gray-800 outline-none placeholder:text-gray-300 placeholder:font-light"
      />
      <p className="mt-3 text-[10px] tracking-widest text-gray-600 uppercase">
        {resultsCount} RESULTS
      </p>
    </div>
  );
}
