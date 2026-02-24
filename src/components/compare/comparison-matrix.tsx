import React from "react";
import { Check, X, Minus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type ComparisonTool = {
  name: string;
  slug: string;
  category: string;
  isBeseam?: boolean;
  features: Record<string, string | boolean>;
};

export type FeatureDefinition = {
  id: string;
  label: string;
  description: string;
};

export function ComparisonMatrix({
  tools,
  features,
}: {
  tools: ComparisonTool[];
  features: FeatureDefinition[];
}) {
  // Always ensure Beseam is the first tool if present
  const sortedTools = [...tools].sort((a, b) => {
    if (a.isBeseam) return -1;
    if (b.isBeseam) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="rounded-2xl border bg-card/50 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow className="bg-muted/30 border-b hover:bg-muted/30">
              <TableHead className="w-[220px] py-6 pl-6 font-bold text-foreground">
                Feature
              </TableHead>
              {sortedTools.map((tool) => (
                <TableHead
                  key={tool.slug}
                  className={cn(
                    "min-w-[120px] text-center py-6 font-bold px-2",
                    tool.isBeseam
                      ? "text-primary bg-primary/5"
                      : "text-foreground",
                  )}
                >
                  <div className="truncate">{tool.name}</div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature) => (
              <TableRow
                key={feature.id}
                className="hover:bg-accent/5 transition-colors"
              >
                <TableCell className="py-4 pl-6 align-top">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-sm whitespace-normal leading-tight">
                      {feature.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground leading-snug whitespace-normal max-w-[200px]">
                      {feature.description}
                    </span>
                  </div>
                </TableCell>
                {sortedTools.map((tool) => {
                  const value = tool.features[feature.id];
                  return (
                    <TableCell
                      key={tool.slug}
                      className={cn(
                        "text-center py-4 align-middle",
                        tool.isBeseam ? "bg-primary/5 font-medium" : "",
                      )}
                    >
                      {typeof value === "boolean" ? (
                        value ? (
                          <div className="flex justify-center">
                            <div className="rounded-full bg-green-500/10 p-1">
                              <Check className="h-4 w-4 text-green-600" />
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <div className="rounded-full bg-muted/10 p-1">
                              <X className="h-3 w-3 text-muted-foreground/30" />
                            </div>
                          </div>
                        )
                      ) : (
                        <div className="text-[11px] leading-tight px-1 font-medium text-foreground/80 break-words">
                          {value || (
                            <Minus className="mx-auto h-3 w-3 text-muted-foreground/20" />
                          )}
                        </div>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
