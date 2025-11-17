import {
  BadgePercent,
  CheckCircle,
  CircleMinus,
  Code2,
  Headset,
  LineChart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Compare3 = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col items-center gap-4">
          <Badge variant="outline">Comparison</Badge>
          <h2 className="mx-auto max-w-2xl text-center text-4xl font-semibold sm:text-5xl">
            See how Acme stacks up against the competition
          </h2>
          <p className="text-muted-foreground mx-auto mt-2 max-w-2xl text-center">
            Discover why our customers choose Acme over other document
            management solutions
          </p>
        </div>
        <div className="-mx-7 overflow-x-auto">
          <div className="min-w-2xl mt-14 grid grid-cols-3">
            <div className="border-border border-b p-5"></div>
            <div className="border-border bg-muted flex flex-col items-center gap-2 rounded-t-2xl border-b p-5">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                alt="Acme logo"
                className="size-8"
              />
              <p className="text-lg font-semibold">Acme</p>
              <p className="text-muted-foreground mt-1 text-center text-sm">
                Built with customer needs in mind
              </p>
            </div>
            <div className="border-border flex flex-col items-center gap-2 border-b p-5">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg"
                alt="Biz logo"
                className="size-8"
              />
              <p className="text-lg font-semibold">Biz</p>
              <p className="text-muted-foreground mt-1 text-center text-sm">
                A popular alternative solution
              </p>
            </div>
            <div className="border-border flex items-center gap-2 border-b p-5">
              <Users className="size-4 shrink-0" />
              <span className="font-semibold">Team Overview</span>
            </div>
            <div className="border-border bg-muted flex flex-col items-center justify-center gap-2 border-b p-5">
              <CheckCircle className="size-5 text-green-600" />
              <span className="text-muted-foreground text-xs">
                Comprehensive dashboard
              </span>
            </div>
            <div className="border-border flex flex-col items-center justify-center gap-2 border-b p-5">
              <CircleMinus className="size-5 text-red-600" />
              <span className="text-muted-foreground text-xs">
                Basic overview only
              </span>
            </div>
            <div className="border-border flex items-center gap-2 border-b p-5">
              <BadgePercent className="size-4 shrink-0" />
              <span className="font-semibold">Custom Branding</span>
            </div>
            <div className="border-border bg-muted flex flex-col items-center justify-center gap-2 border-b p-5">
              <CheckCircle className="size-5 text-green-600" />
              <span className="text-muted-foreground text-xs">
                Full customization
              </span>
            </div>
            <div className="border-border flex flex-col items-center justify-center gap-2 border-b p-5">
              <CheckCircle className="size-5 text-green-600" />
              <span className="text-muted-foreground text-xs">
                Limited options
              </span>
            </div>
            <div className="border-border flex items-center gap-2 border-b p-5">
              <Code2 className="size-4 shrink-0" />
              <span className="font-semibold">API Access</span>
            </div>
            <div className="border-border bg-muted flex flex-col items-center justify-center gap-2 border-b p-5">
              <CheckCircle className="size-5 text-green-600" />
              <span className="text-muted-foreground text-xs">Robust API</span>
            </div>
            <div className="border-border flex flex-col items-center justify-center gap-2 border-b p-5">
              <CircleMinus className="size-5 text-red-600" />
              <span className="text-muted-foreground text-xs">
                No API available
              </span>
            </div>
            <div className="border-border flex items-center gap-2 border-b p-5">
              <LineChart className="size-4 shrink-0" />
              <span className="font-semibold">Advanced Analytics</span>
              <Badge variant="secondary">Soon</Badge>
            </div>
            <div className="border-border bg-muted flex flex-col items-center justify-center gap-2 border-b p-5">
              <CircleMinus className="size-5 text-red-600" />
              <span className="text-muted-foreground text-xs">
                Coming Q3 2025
              </span>
            </div>
            <div className="border-border flex flex-col items-center justify-center gap-2 border-b p-5">
              <CheckCircle className="size-5 text-green-600" />
              <span className="text-muted-foreground text-xs">
                Basic reporting
              </span>
            </div>
            <div className="border-border flex items-center gap-2 p-5">
              <Headset className="size-4 shrink-0" />
              <span className="font-semibold">Customer Support</span>
            </div>
            <div className="border-border bg-muted flex flex-col items-center justify-center gap-2 p-5">
              <CheckCircle className="size-5 text-green-600" />
              <span className="text-muted-foreground text-xs">
                24/7 dedicated team
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 p-5">
              <CircleMinus className="size-5 text-red-600" />
              <span className="text-muted-foreground text-xs">
                Email support only
              </span>
            </div>
            <div className="border-border p-5"></div>
            <div className="border-border bg-muted flex items-center justify-center gap-2 rounded-b-2xl p-5">
              <Button className="w-full">Try Acme today</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Compare3 };
