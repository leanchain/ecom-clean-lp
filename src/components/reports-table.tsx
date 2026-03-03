'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { SlidersHorizontal, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { FaviconImage } from '@/components/favicon-image';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface ReportEntry {
  audit_id: number;
  url: string;
  discovery_score: number | null;
  conversion_score: number | null;
  completed_at: number; // Unix ms
  p1_count: number;
  p2_count: number;
  p3_count: number;
}

/* ------------------------------------------------------------------ */
/*  Filter config                                                       */
/* ------------------------------------------------------------------ */

type FilterKey = 'discovery' | 'conversion' | 'issues';
type FilterValue = string;
type ActiveFilters = Record<FilterKey, Set<FilterValue>>;

const FILTER_GROUPS: {
  key: FilterKey;
  label: string;
  options: { value: string; label: string }[];
}[] = [
  {
    key: 'discovery',
    label: 'Discovery Score (AI Search)',
    options: [
      { value: 'good', label: 'Good — 70+' },
      { value: 'average', label: 'Average — 40–69' },
      { value: 'poor', label: 'Poor — below 40' },
      { value: 'none', label: 'Not yet analyzed' },
    ],
  },
  {
    key: 'conversion',
    label: 'Conversion Score',
    options: [
      { value: 'good', label: 'Good — 70+' },
      { value: 'average', label: 'Average — 40–69' },
      { value: 'poor', label: 'Poor — below 40' },
      { value: 'none', label: 'Not yet analyzed' },
    ],
  },
  {
    key: 'issues',
    label: 'Issues',
    options: [
      { value: 'has_p1', label: 'Has P1 issues' },
      { value: 'p1_free', label: 'P1-free only' },
      { value: 'has_p2', label: 'Has P2 issues' },
      { value: 'clean', label: 'No issues at all' },
    ],
  },
];

function scoreCategory(score: number | null): 'good' | 'average' | 'poor' | 'none' {
  if (score == null) return 'none';
  if (score >= 70) return 'good';
  if (score >= 40) return 'average';
  return 'poor';
}

function matchesFilters(report: ReportEntry, filters: ActiveFilters): boolean {
  // Discovery
  if (filters.discovery.size > 0 && !filters.discovery.has(scoreCategory(report.discovery_score))) {
    return false;
  }
  // Conversion
  if (filters.conversion.size > 0 && !filters.conversion.has(scoreCategory(report.conversion_score))) {
    return false;
  }
  // Issues
  if (filters.issues.size > 0) {
    const issueMatches = Array.from(filters.issues).some((val) => {
      if (val === 'has_p1') return report.p1_count > 0;
      if (val === 'p1_free') return report.p1_count === 0;
      if (val === 'has_p2') return report.p2_count > 0;
      if (val === 'clean') return report.p1_count === 0 && report.p2_count === 0;
      return false;
    });
    if (!issueMatches) return false;
  }
  return true;
}

/* ------------------------------------------------------------------ */
/*  Score cell helper                                                   */
/* ------------------------------------------------------------------ */

function ScoreCell({
  score,
  colorCls,
  label,
}: {
  score: number | null;
  colorCls: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      {score != null ? (
        <div className="flex items-baseline gap-1">
          <span className={cn('font-black text-2xl tabular-nums tracking-tighter', colorCls)}>
            {Math.round(score)}
          </span>
          <span className={cn('text-[10px] font-bold opacity-50', colorCls)}>/100</span>
        </div>
      ) : (
        <span className="text-xl font-bold text-muted-foreground/40">—</span>
      )}
      <span className={cn('text-[8px] font-black uppercase tracking-widest opacity-70', colorCls)}>
        {label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Filter popover                                                       */
/* ------------------------------------------------------------------ */

function FilterPopover({
  filters,
  onChange,
  totalActive,
}: {
  filters: ActiveFilters;
  onChange: (key: FilterKey, value: string, checked: boolean) => void;
  totalActive: number;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 text-xs font-semibold relative"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filter
          {totalActive > 0 && (
            <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
              {totalActive}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 p-3">
        <div className="space-y-4">
          {FILTER_GROUPS.map((group, gi) => (
            <div key={group.key}>
              {gi > 0 && <Separator className="mb-3" />}
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">
                {group.label}
              </p>
              <div className="space-y-1.5">
                {group.options.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <Checkbox
                      checked={filters[group.key].has(opt.value)}
                      onCheckedChange={(checked) =>
                        onChange(group.key, opt.value, !!checked)
                      }
                      className="h-3.5 w-3.5"
                    />
                    <span className="text-xs text-foreground/80 group-hover:text-foreground transition-colors">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {totalActive > 0 && (
            <>
              <Separator />
              <Button
                variant="ghost"
                size="sm"
                className="w-full h-7 text-xs text-muted-foreground hover:text-foreground gap-1.5"
                onClick={() =>
                  FILTER_GROUPS.forEach((g) => {
                    g.options.forEach((o) => onChange(g.key, o.value, false));
                  })
                }
              >
                <X className="h-3 w-3" />
                Clear all filters
              </Button>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                          */
/* ------------------------------------------------------------------ */

export function ReportsTable({ reports }: { reports: ReportEntry[] }) {
  const [filters, setFilters] = useState<ActiveFilters>({
    discovery: new Set(),
    conversion: new Set(),
    issues: new Set(),
  });

  const totalActive = filters.discovery.size + filters.conversion.size + filters.issues.size;

  const handleFilterChange = (key: FilterKey, value: string, checked: boolean) => {
    setFilters((prev) => {
      const next = new Set(prev[key]);
      if (checked) next.add(value);
      else next.delete(value);
      return { ...prev, [key]: next };
    });
  };

  const filtered = useMemo(
    () => reports.filter((r) => matchesFilters(r, filters)),
    [reports, filters]
  );

  if (reports.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Table header row with filter button */}
      <div className="flex items-center justify-between mb-3 px-1">
        <p className="text-xs text-muted-foreground">
          {totalActive > 0
            ? `${filtered.length} of ${reports.length} audits`
            : `${reports.length} audits`}
        </p>
        <FilterPopover
          filters={filters}
          onChange={handleFilterChange}
          totalActive={totalActive}
        />
      </div>

      <div className="border-t border-border/40">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-border/40">
              <TableHead className="min-w-[300px] font-bold py-6 text-foreground uppercase text-[10px] tracking-widest">
                Storefront
              </TableHead>
              <TableHead className="font-bold py-6 text-foreground uppercase text-[10px] tracking-widest text-center">
                Discovery
              </TableHead>
              <TableHead className="font-bold py-6 text-foreground uppercase text-[10px] tracking-widest text-center">
                Conversion
              </TableHead>
              <TableHead className="font-bold py-6 text-foreground uppercase text-[10px] tracking-widest text-center">
                Issues
              </TableHead>
              <TableHead className="font-bold py-6 text-foreground text-right pr-8 uppercase text-[10px] tracking-widest">
                Audited
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-16 text-muted-foreground text-sm">
                  No audits match the current filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((report) => {
                const url = new URL(report.url);
                const domain = url.hostname;
                const path = url.pathname !== '/' ? url.pathname : '';
                const timeAgo = formatDistanceToNow(new Date(report.completed_at), {
                  addSuffix: true,
                });

                return (
                  <TableRow
                    key={report.audit_id}
                    className="group hover:bg-primary/[0.02] transition-all duration-300 border-b border-border/20"
                  >
                    <TableCell className="py-8">
                      <Link
                        href={`https://app.beseam.com/report/${report.audit_id}`}
                        target="_blank"
                        rel="noopener"
                        className="flex items-center gap-5"
                      >
                        <div className="h-12 w-12 shrink-0 rounded-2xl bg-white dark:bg-muted/20 border border-border/40 flex items-center justify-center overflow-hidden p-2.5 shadow-xs transition-transform group-hover:scale-110">
                          <FaviconImage
                            domain={domain}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-black text-lg text-foreground group-hover:text-primary transition-colors tracking-tight truncate">
                            {domain}
                          </span>
                          <span className="text-[10px] font-bold text-muted-foreground/60 truncate max-w-[200px]">
                            {path || 'Homepage'}
                          </span>
                        </div>
                      </Link>
                    </TableCell>

                    <TableCell className="py-8">
                      <ScoreCell
                        score={report.discovery_score}
                        colorCls="text-blue-600 dark:text-blue-400"
                        label="AI Search"
                      />
                    </TableCell>

                    <TableCell className="py-8">
                      <ScoreCell
                        score={report.conversion_score}
                        colorCls="text-emerald-600 dark:text-emerald-400"
                        label="Conversion"
                      />
                    </TableCell>

                    <TableCell className="py-8">
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex flex-col items-center px-3 py-1 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20">
                          <span className="text-xs font-black text-red-600 dark:text-red-400">
                            {report.p1_count}
                          </span>
                          <span className="text-[7px] font-bold text-red-500/70 uppercase tracking-widest">
                            P1
                          </span>
                        </div>
                        <div className="flex flex-col items-center px-3 py-1 rounded-lg bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20">
                          <span className="text-xs font-black text-orange-600 dark:text-orange-400">
                            {report.p2_count}
                          </span>
                          <span className="text-[7px] font-bold text-orange-500/70 uppercase tracking-widest">
                            P2
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="py-8 text-right pr-8">
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-bold text-foreground/80 tabular-nums">
                          {timeAgo}
                        </span>
                        <Link
                          href={`https://app.beseam.com/report/${report.audit_id}`}
                          target="_blank"
                          rel="noopener"
                          className="inline-flex items-center gap-1 text-[11px] font-black text-primary hover:text-primary/80 transition-colors uppercase tracking-widest mt-2"
                        >
                          Report →
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
