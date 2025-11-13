import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Zap, Lightbulb, Radio, Ruler, Scale } from "lucide-react";

const ICONS_MAP = {
  Zap,
  Lightbulb,
  Radio,
  Ruler,
  Scale,
} as const;

type Spec = {
  key: string;
  label: string;
  value: string;
  icon?: string;
};

interface SpecificationsTableProps {
  sections: Record<string, Spec[]>;
}

export default function SpecificationsTable({ sections }: SpecificationsTableProps) {
  return (
    <div className="space-y-6">
      {Object.entries(sections).map(([titleKey, specs]) => (
        <Card key={titleKey} className="gap-0 overflow-hidden rounded-xl border-none py-0">
          <CardHeader className="bg-border inline-block px-4 py-3 text-xl font-semibold md:px-8">
            {titleKey
              .split(/(?=[A-Z])/)
              .join(" ")
              .toLowerCase()
              .replace(/\b\w/g, (l) => l.toUpperCase())}
          </CardHeader>
          <CardContent className="p-4 md:p-8">
            <div>
              {specs.map((spec) => {
                const Icon = spec.icon
                  ? ICONS_MAP[spec.icon as keyof typeof ICONS_MAP]
                  : null;
                return (
                  <div
                    key={spec.key}
                    className="flex flex-col justify-between gap-3 border-b py-4 first:pt-0 lg:flex-row lg:items-center"
                  >
                    <div className="flex items-center gap-3">
                      {Icon && (
                        <Icon className="text-muted-foreground fill-input" />
                      )}
                      <span className="text-xl">{spec.label}</span>
                    </div>
                    <span className="text-xl lg:text-end">{spec.value}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

