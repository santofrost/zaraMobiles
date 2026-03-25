import { ProductSpecs } from "../types";
import { useLanguage } from "@/features/i18n/LanguageContext";
import { TranslationKey } from "@/features/i18n/translations";

interface SpecificationsTableProps {
  brand: string;
  name: string;
  description: string;
  specs: ProductSpecs;
}

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
          {rows.map((row) => {
            const translationTarget = `specs.${row.key}` as keyof typeof t extends never ? never : TranslationKey;

            return (
              <div
                key={row.key}
                className="flex flex-col gap-1 border-b border-gray-200 py-4 sm:flex-row sm:gap-8"
              >
                <span className="shrink-0 w-48 text-xs font-medium tracking-wider text-gray-900 uppercase">
                  {t(translationTarget) !== translationTarget ? t(translationTarget) : row.key}
                </span>
                <span className="text-sm text-gray-600">
                  {row.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
