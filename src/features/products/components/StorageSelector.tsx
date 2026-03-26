import { StorageOption } from "../types";
import { useLanguage } from "@/features/i18n/LanguageContext";

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
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-3">
      <span
        id="storage-label"
        className="text-[10px] font-semibold tracking-widest text-gray-500 uppercase"
      >
        {t("detail.storage")}
      </span>
      <div className="flex gap-0" role="radiogroup" aria-labelledby="storage-label">
        {options.map((option, index) => (
          <button
            key={option.capacity}
            role="radio"
            aria-checked={index === selectedIndex}
            onClick={() => onSelect(index)}
            className={`relative border px-5 py-3 text-xs font-medium tracking-wide transition-colors focus:outline-none focus-visible:z-10 focus-visible:ring-4 focus-visible:ring-blue-500 ${
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
