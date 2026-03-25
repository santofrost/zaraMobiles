import { ProductSpecs } from "../types";
import { useLanguage } from "@/features/i18n/LanguageContext";

interface SpecificationsTableProps {
  brand: string;
  name: string;
  description: string;
  specs: ProductSpecs;
}

const SPEC_LABELS: Record<string, string> = {
  brand: "Brand",
  name: "Name",
  description: "Description",
  screen: "Screen",
  resolution: "Resolution",
  processor: "Processor",
  mainCamera: "Main Camera",
  selfieCamera: "Selfie Camera",
  battery: "Battery",
  os: "OS",
  screenRefreshRate: "Screen Refresh Rate",
};

export default function SpecificationsTable({
  brand,
  name,
  description,
  specs,
}: SpecificationsTableProps) {
  const { t } = useLanguage();

  const rows = [
    { key: "brand", value: brand },
    { key: "name", value: name },
    { key: "description", value: description },
    ...Object.entries(specs).map(([key, value]) => ({ key, value })),
  ];

  return (
    <section className="px-4 py-12 border-t border-gray-100 sm:px-8 mt-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="mb-8 text-sm font-semibold tracking-widest text-gray-900 uppercase">
          {t("detail.specifications")}
        </h2>
        <div className="border-t border-gray-200">
          {rows.map((row) => (
            <div
              key={row.key}
              className="flex flex-col gap-1 border-b border-gray-200 py-4 sm:flex-row sm:gap-8"
            >
              <span className="shrink-0 w-48 text-xs font-medium tracking-wider text-gray-900 uppercase">
                {SPEC_LABELS[row.key] || row.key}
              </span>
              <span className="text-sm text-gray-600">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
