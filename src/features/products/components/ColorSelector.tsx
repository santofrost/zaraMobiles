import { ColorOption } from "../types";

interface ColorSelectorProps {
  options: ColorOption[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export default function ColorSelector({
  options,
  selectedIndex,
  onSelect,
}: ColorSelectorProps) {
  return (
    <div>
      <p className="text-xs font-medium tracking-wider text-gray-500 uppercase mb-3">
        Color. Pick your favourite.
      </p>
      <div className="flex gap-3">
        {options.map((option, index) => (
          <button
            key={option.name}
            onClick={() => onSelect(index)}
            title={option.name}
            className={`h-8 w-8 rounded-sm transition-all ${
              index === selectedIndex
                ? "ring-2 ring-offset-2 ring-black"
                : "hover:ring-1 hover:ring-offset-1 hover:ring-gray-400"
            }`}
            style={{ backgroundColor: option.hexCode }}
          />
        ))}
      </div>
    </div>
  );
}
