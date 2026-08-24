"use client";

import Image from "next/image";
import { useState } from "react";

import AiVisibilityPreview from "@/components/beseam/ai-visibility-preview";
import { cn } from "@/lib/utils";

type Workspace = "visibility" | "health";

const WORKSPACES: Array<{
  id: Workspace;
  label: string;
  detail: string;
}> = [
  {
    id: "visibility",
    label: "AI Visibility",
    detail: "Answers, citations, and competitors",
  },
  {
    id: "health",
    label: "Store Health",
    detail: "Conversion and storefront issues",
  },
];

export default function WorkspaceShowcase() {
  const [activeWorkspace, setActiveWorkspace] =
    useState<Workspace>("visibility");

  return (
    <figure>
      <figcaption className="sr-only">
        Switch between the Beseam AI Visibility and Store Health products.
      </figcaption>

      <div
        role="tablist"
        aria-label="Beseam products"
        className="grid border border-b-0 border-rule bg-panel sm:grid-cols-2"
      >
        {WORKSPACES.map((workspace) => {
          const isActive = activeWorkspace === workspace.id;

          return (
            <button
              key={workspace.id}
              id={`${workspace.id}-tab`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${workspace.id}-panel`}
              onClick={() => setActiveWorkspace(workspace.id)}
              className={cn(
                "flex min-h-16 items-center justify-between gap-4 border-b border-rule px-5 py-4 text-left transition-colors last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0",
                isActive
                  ? "bg-ink text-white"
                  : "bg-panel text-ink hover:bg-surface",
              )}
            >
              <span className="text-[15px] font-semibold">
                {workspace.label}
              </span>
              <span
                className={cn(
                  "hidden text-[12px] sm:block",
                  isActive ? "text-white/62" : "text-muted-foreground",
                )}
              >
                {workspace.detail}
              </span>
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden border border-rule bg-[#f8fafc]">
        {activeWorkspace === "visibility" ? (
          <div
            id="visibility-panel"
            role="tabpanel"
            aria-labelledby="visibility-tab"
            tabIndex={0}
            className="min-h-[34rem] sm:min-h-[40rem]"
          >
            <AiVisibilityPreview className="min-h-[34rem] sm:min-h-[40rem]" />
          </div>
        ) : (
          <div
            id="health-panel"
            role="tabpanel"
            aria-labelledby="health-tab"
            tabIndex={0}
            className="bg-surface p-4 sm:p-8 lg:p-12"
          >
            <Image
              src="/images/store-health/discoverability-issue.png"
              alt="Store Health issue showing a Google Shopping eligibility gap, supporting evidence, and a recommended next step"
              width={996}
              height={875}
              priority
              sizes="(min-width: 1280px) 996px, 90vw"
              className="mx-auto h-auto w-full max-w-[996px]"
            />
          </div>
        )}
      </div>
    </figure>
  );
}
