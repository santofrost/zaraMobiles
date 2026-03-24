import { StorageOption } from "../types";

interface StorageSelectorProps {
  options: StorageOption[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export default function StorageSelector({
  options,
  selectedIndex,
  onSelect,
}: StorageSelectorProps) {
  return (
    <div>
      <p className="text-xs font-medium tracking-wider text-gray-500 uppercase mb-3">
        Storage ¿How much space do you need?
      </p>
      <div className="flex gap-0">
        {options.map((option, index) => (
          <button
            key={option.capacity}
            onClick={() => onSelect(index)}
            className={`px-5 py-3 text-xs font-medium tracking-wide border transition-colors ${
              index === selectedIndex
                ? "border-black bg-black text-white"
                : "border-gray-300 bg-white text-gray-700 hover:border-gray-500"
            }`}
          >
            {option.capacity}
          </button>
        ))}
      </div>
    </div>
  );
}
