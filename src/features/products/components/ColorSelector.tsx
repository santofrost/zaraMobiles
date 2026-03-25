import { ColorOption } from "../types";
import { useLanguage } from "@/features/i18n/LanguageContext";

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
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-3">
      <span className="text-[10px] font-semibold tracking-widest text-gray-500 uppercase mt-4">
        {t("detail.color")}
      </span>
      <div className="flex gap-3">
        {options.map((option, index) => (
          <button
            key={option.name}
            onClick={() => onSelect(index)}
            title={option.name}
            className={`h-8 w-8 rounded-sm transition-all ${index === selectedIndex
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
