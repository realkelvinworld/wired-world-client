import { SortAscendingIcon } from "@phosphor-icons/react";

import { UiLabel, UiSelect } from "@/components/ui";

interface SortToggleProps {
  value: string;
  onChange: (value: string) => void;
}

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "popularity", label: "Popularity" },
  { value: "latest", label: "Latest" },
];

export default function SortToggle({ value, onChange }: SortToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <SortAscendingIcon
        weight="bold"
        className="size-4 shrink-0 text-muted-foreground"
      />
      <UiLabel.Label className="shrink-0 text-sm text-muted-foreground">
        Sort
      </UiLabel.Label>
      <UiSelect.Select
        value={value || "default"}
        onValueChange={(v) => onChange(v === "default" ? "" : v)}
      >
        <UiSelect.SelectTrigger size="sm" className="rounded-full">
          <UiSelect.SelectValue />
        </UiSelect.SelectTrigger>
        <UiSelect.SelectContent>
          {sortOptions.map((opt) => (
            <UiSelect.SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </UiSelect.SelectItem>
          ))}
        </UiSelect.SelectContent>
      </UiSelect.Select>
    </div>
  );
}
