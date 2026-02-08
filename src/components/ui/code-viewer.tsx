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
        'rounded-md border border-border/20 overflow-hidden bg-background relative flex flex-col min-h-0 group min-w-[250px]',
        className
      )}
      style={{ maxHeight, minHeight, height }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-0 right-3 z-10 h-8 w-8 opacity-30 hover:opacity-100 transition-opacity hover:text-primary hover:bg-muted/50"
        onClick={copyToClipboard}
        title="Copy to clipboard"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </Button>

      <CodeMirror
        value={displayString}
        height="100%"
        extensions={extensions}
        theme={isDark ? vscodeDark : vscodeLight}
        editable={!readOnly}
        onChange={onChange}
        basicSetup={{
          lineNumbers,
          foldGutter: true,
          highlightActiveLine: false,
          highlightSelectionMatches: true,
          dropCursor: false,
          indentOnInput: false,
        }}
        className="text-[12px] cm-custom-editor flex-1 min-h-0"
      />

      <style jsx global>{`
        .cm-custom-editor {
          display: flex !important;
          flex-direction: column !important;
          height: 100% !important;
          min-height: 0 !important;
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
        .cm-custom-editor .cm-search {
          padding: 6px 10px !important;
          background: #f1f5f9 !important;
          border-bottom: 1.5px solid #e2e8f0 !important;
          display: flex !important;
          flex-wrap: wrap !important;
          gap: 8px !important;
          align-items: center !important;
        }
        .cm-custom-editor .cm-search [name='search'] {
          min-width: 240px !important;
          font-size: 13px !important;
          padding: 3px 10px !important;
          border-radius: 4px !important;
          border: 1px solid #cbd5e1 !important;
          background: white !important;
        }
        .cm-custom-editor .cm-search button {
          font-size: 12px !important;
          font-weight: 500 !important;
          padding: 3px 10px !important;
          border-radius: 4px !important;
          background: #ffffff !important;
          border: 1px solid #cbd5e1 !important;
          color: #334155 !important;
          cursor: pointer !important;
          transition: all 0.1s ease !important;
        }
        .cm-custom-editor .cm-search button:hover {
          background: #f8fafc !important;
          border-color: #94a3b8 !important;
        }
        .cm-custom-editor .cm-search button[name='close'] {
          margin-left: auto !important;
          padding: 2px 8px !important;
          font-size: 14px !important;
          border: none !important;
          background: transparent !important;
          opacity: 0.5 !important;
        }
        .cm-custom-editor .cm-search button[name='close']:hover {
          opacity: 1 !important;
          background: #fee2e2 !important;
          color: #ef4444 !important;
        }
        .cm-custom-editor .cm-search label {
          font-size: 12px !important;
          font-weight: 500 !important;
          color: #475569 !important;
          display: flex !important;
          align-items: center !important;
          gap: 4px !important;
          cursor: pointer !important;
        }
        .cm-custom-editor .cm-search label input {
          width: 14px !important;
          height: 14px !important;
          cursor: pointer !important;
        }
      `}</style>
    </div>
  );
}
