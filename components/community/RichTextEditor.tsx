"use client";

/**
 * Lightweight rich-text editor for discussions (#1003).
 * Supports bold, italic, lists, links, code blocks, and quotes.
 * Serializes to HTML string suitable for API submission.
 * Works on desktop and mobile (touch-friendly toolbar).
 */

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from "react";

export interface RichTextEditorProps {
  /** Controlled HTML value */
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  /** Accessible label */
  label?: string;
  minHeight?: string;
  disabled?: boolean;
}

function ToolbarButton({
  onClick,
  title,
  children,
  active,
}: {
  onClick: () => void;
  title: string;
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      onMouseDown={(e) => {
        // Keep selection in the editor
        e.preventDefault();
        onClick();
      }}
      className={`rounded px-2 py-1.5 text-sm font-medium min-h-[36px] min-w-[36px] touch-manipulation ${
        active
          ? "bg-[var(--primary)]/15 text-[var(--primary)]"
          : "text-[var(--muted)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]"
      }`}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your discussion…",
  label = "Discussion content",
  minHeight = "160px",
  disabled = false,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const id = useId();

  // Sync external value when it changes from outside (e.g. prefill on edit)
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (el.innerHTML !== value) {
      el.innerHTML = value || "";
    }
  }, [value]);

  const emit = useCallback(() => {
    const el = editorRef.current;
    if (!el) return;
    onChange(el.innerHTML);
  }, [onChange]);

  const run = (command: string, valueArg?: string) => {
    if (disabled) return;
    editorRef.current?.focus();
    document.execCommand(command, false, valueArg);
    emit();
  };

  const insertLink = () => {
    const url = window.prompt("Link URL", "https://");
    if (!url) return;
    run("createLink", url);
  };

  const insertCodeBlock = () => {
    const el = editorRef.current;
    if (!el) return;
    el.focus();
    const selection = window.getSelection();
    const text = selection?.toString() || "code";
    document.execCommand(
      "insertHTML",
      false,
      `<pre><code>${text.replace(/</g, "&lt;")}</code></pre><p><br/></p>`,
    );
    emit();
  };

  const insertQuote = () => {
    run("formatBlock", "blockquote");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background)]">
      <div
        className="flex flex-wrap items-center gap-0.5 border-b border-[var(--border)] bg-[var(--secondary)]/40 px-1 py-1"
        role="toolbar"
        aria-label="Formatting"
      >
        <ToolbarButton title="Bold" onClick={() => run("bold")}>
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton title="Italic" onClick={() => run("italic")}>
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton title="Bullet list" onClick={() => run("insertUnorderedList")}>
          • List
        </ToolbarButton>
        <ToolbarButton title="Numbered list" onClick={() => run("insertOrderedList")}>
          1. List
        </ToolbarButton>
        <ToolbarButton title="Link" onClick={insertLink}>
          Link
        </ToolbarButton>
        <ToolbarButton title="Code block" onClick={insertCodeBlock}>
          {"</>"}
        </ToolbarButton>
        <ToolbarButton title="Quote" onClick={insertQuote}>
          “ ”
        </ToolbarButton>
      </div>

      <div
        id={id}
        ref={editorRef}
        role="textbox"
        aria-multiline="true"
        aria-label={label}
        contentEditable={!disabled}
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onInput={emit}
        onBlur={emit}
        className="prose prose-sm max-w-none px-3 py-2 text-[var(--foreground)] focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-[var(--muted)]"
        style={{ minHeight }}
      />
    </div>
  );
}

/** Strip HTML to plain text length for validation helpers. */
export function richTextPlainLength(html: string): number {
  if (typeof document === "undefined") {
    return html.replace(/<[^>]+>/g, "").trim().length;
  }
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return (tmp.textContent || "").trim().length;
}

export default RichTextEditor;
