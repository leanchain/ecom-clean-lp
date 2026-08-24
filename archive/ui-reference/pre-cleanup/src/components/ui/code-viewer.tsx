'use client';

import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { html } from '@codemirror/lang-html';
import { markdown } from '@codemirror/lang-markdown';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';
import { Button } from './button';

interface CodeViewerProps {
  value: any;
  language?: 'json' | 'html' | 'markdown';
  className?: string;
  maxHeight?: string;
  minHeight?: string;
  height?: string;
  readOnly?: boolean;
  lineNumbers?: boolean;
  onChange?: (value: string) => void;
}

export function CodeViewer({
  value,
  language = 'json',
  className,
  maxHeight = '400px',
  minHeight = '80px',
  height = 'auto',
  readOnly = true,
  lineNumbers = true,
  onChange,
}: CodeViewerProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [copied, setCopied] = React.useState(false);

  const displayString = React.useMemo(() => {
    if (!value) return '';
    if (language === 'json') {
      if (typeof value === 'string') {
        try {
          return JSON.stringify(JSON.parse(value), null, 2);
        } catch {
          return value;
        }
      }
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  }, [value, language]);

  const copyToClipboard = React.useCallback(() => {
    navigator.clipboard.writeText(displayString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [displayString]);

  const extensions = React.useMemo(() => {
    switch (language) {
      case 'json':
        return [json()];
      case 'html':
        return [html()];
      case 'markdown':
        return [markdown()];
      default:
        return [];
    }
  }, [language]);

  return (
    <div
      className={cn(
        'rounded-md border overflow-hidden relative flex flex-col min-h-0 group min-w-[250px] transition-all duration-200',
        readOnly 
          ? 'bg-muted/40 border-dashed border-border/60' 
          : 'bg-background border-solid border-border shadow-sm focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20',
        className
      )}
      style={{ maxHeight, minHeight, height }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-3 z-10 h-7 w-7 opacity-30 hover:opacity-100 transition-opacity hover:text-primary hover:bg-muted/50"
        onClick={copyToClipboard}
        title="Copy to clipboard"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
      </Button>

      <CodeMirror
        value={displayString}
        height="100%"
        extensions={extensions}
        theme={isDark ? vscodeDark : vscodeLight}
        editable={true}
        readOnly={readOnly}
        onChange={onChange}
        basicSetup={{
          lineNumbers,
          foldGutter: true,
          highlightActiveLine: !readOnly,
          highlightSelectionMatches: true,
          dropCursor: !readOnly,
          indentOnInput: !readOnly,
          searchKeymap: true,
          defaultKeymap: true,
          history: !readOnly,
          drawSelection: true,
          bracketMatching: true,
          closeBrackets: !readOnly,
        }}
        className={cn(
          "text-[12px] cm-custom-editor flex-1 min-h-0",
          readOnly && "cm-readonly"
        )}
      />

      <style jsx global>{`
        .cm-custom-editor {
          display: flex !important;
          flex-direction: column !important;
          height: 100% !important;
          min-height: 0 !important;
        }
        .cm-custom-editor.cm-readonly .cm-editor,
        .cm-custom-editor.cm-readonly .cm-scroller {
          background-color: transparent !important;
        }
        .cm-custom-editor .cm-theme-container,
        .cm-custom-editor .cm-editor {
          height: 100% !important;
          display: flex !important;
          flex-direction: column !important;
          flex: 1 !important;
          min-height: 0 !important;
        }
        .cm-custom-editor .cm-scroller {
          flex: 1 !important;
          overflow: auto !important;
          font-family: var(--font-mono), monospace !important;
          min-height: 0 !important;
        }
        .cm-custom-editor .cm-content {
          height: auto !important;
          line-height: 1.6 !important;
          padding-right: 2.5rem !important;
        }
        .cm-custom-editor.cm-readonly .cm-content {
          cursor: default !important;
        }
        /* Compact Shadcn-like Integrated Search Toolbar */
        .cm-custom-editor .cm-search {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          padding: 4px 12px !important;
          background-color: var(--background) !important;
          border-bottom: 1px solid var(--border) !important;
          z-index: 50 !important;
        }
        .cm-custom-editor .cm-search [name='search'] {
          flex: 1 !important;
          max-width: 280px !important;
          height: 24px !important;
          font-size: 12px !important;
          padding: 0 8px !important;
          border-radius: 4px !important;
          border: 1px solid var(--border) !important;
          background-color: var(--background) !important;
          color: var(--foreground) !important;
          outline: none !important;
          transition: border-color 0.2s, ring 0.2s !important;
        }
        .cm-custom-editor .cm-search [name='search']:focus {
          border-color: var(--ring) !important;
          box-shadow: 0 0 0 1px var(--ring) !important;
        }
        .cm-custom-editor .cm-search button {
          height: 20px !important;
          padding: 0 8px !important;
          font-size: 10px !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.02em !important;
          border-radius: 4px !important;
          border: none !important;
          background-color: var(--secondary) !important;
          color: var(--secondary-foreground) !important;
          cursor: pointer !important;
          transition: all 0.15s ease !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .cm-custom-editor .cm-search button:hover {
          opacity: 0.9 !important;
          transform: translateY(-0.5px) !important;
        }
        .cm-custom-editor .cm-search button:active {
          transform: translateY(0) !important;
          opacity: 0.8 !important;
        }
        .cm-custom-editor .cm-search button[name='close'] {
          margin-left: auto !important;
          width: 20px !important;
          height: 20px !important;
          padding: 0 !important;
          border: none !important;
          background: transparent !important;
          color: var(--muted-foreground) !important;
          font-size: 16px !important;
          font-weight: 300 !important;
          border-radius: 50% !important;
        }
        .cm-custom-editor .cm-search button[name='close']:hover {
          color: var(--destructive) !important;
          background-color: var(--destructive/10) !important;
          transform: none !important;
        }
        .cm-custom-editor .cm-search label {
          font-size: 11px !important;
          font-weight: 400 !important;
          color: var(--muted-foreground) !important;
          display: flex !important;
          align-items: center !important;
          gap: 4px !important;
          white-space: nowrap !important;
          cursor: pointer !important;
          user-select: none !important;
        }
        .cm-custom-editor .cm-search label input {
          width: 12px !important;
          height: 12px !important;
          border-radius: 3px !important;
          border: 1px solid var(--border) !important;
          accent-color: var(--primary) !important;
        }
      `}</style>
    </div>
  );
}
