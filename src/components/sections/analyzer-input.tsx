'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AnimatedBorderContainer from '@/components/ui/animated-border-container';
import { cn } from '@/lib/utils';

export const AnalyzerInput = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    // Redirect to the main app's analyzer with the URL in a new tab
    // Start running by passing the url as a query param
    const encodedUrl = encodeURIComponent(url);
    window.open(`https://app.beseam.com/analyze?url=${encodedUrl}`, "_blank");
    setLoading(false);
  };

  return (
    <div className="mx-auto w-full max-w-2xl pt-4 transition-all duration-300">
      <AnimatedBorderContainer>
        <form
          onSubmit={handleScan}
          className={cn(
            'flex gap-1 p-1 bg-background border rounded-full shadow-lg transition-all duration-300 items-center',
            'hover:shadow-xl focus-within:shadow-xl focus-within:ring-2 focus-within:ring-primary/20',
            loading && 'animate-pulse shadow-primary/10'
          )}
        >
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your product URL"
            className="border-0 shadow-none focus-visible:ring-0 focus-visible:border-0 focus-visible:border-transparent rounded-l-full pl-6 text-sm md:text-base h-10 md:h-12"
            animate={false}
          />

          <Button
            size="lg"
            type="submit"
            disabled={!url}
            loading={loading}
            className="rounded-full px-4 md:px-8 h-10 md:h-12 text-sm md:text-base font-semibold shrink-0 transition-transform active:scale-95 bg-primary text-white"
          >
            <>
              <span className="hidden md:inline">Analyze Now</span>
              <Sparkles className="md:hidden w-5 h-5" />
              <ArrowRight className="hidden md:inline ml-2 h-4 w-4" />
            </>
          </Button>
        </form>
      </AnimatedBorderContainer>

      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground/80">
          Analyzes 220+ checks across 10 domains • 100% Free • No credit card required
        </p>
      </div>
    </div>
  );
};
