'use client';

/**
 * SkipToContent
 *
 * Provides a skip-navigation link that becomes visible on focus.
 * Allows keyboard users to bypass repetitive navigation and jump
 * directly to main content.
 *
 * Place this as the first child of the page layout.
 */
export function SkipToContent({ targetId = 'main-content' }: { targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-cyan-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
    >
      Skip to main content
    </a>
  );
}

/**
 * VisuallyHidden
 *
 * Renders content that is visually hidden but accessible to screen readers.
 */
export function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>;
}

/**
 * FocusTrap
 *
 * Traps keyboard focus within a container (useful for modals/dialogs).
 * Pressing Tab or Shift+Tab cycles focus within focusable children.
 */
export function useFocusTrap(containerRef: React.RefObject<HTMLElement | null>, isActive: boolean) {
  if (typeof window === 'undefined') return;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isActive || !containerRef.current || e.key !== 'Tab') return;

    const focusable = containerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  // Attach/detach listener
  if (isActive) {
    document.addEventListener('keydown', handleKeyDown);
  }

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Accessible announcement for dynamic content updates.
 * Renders an ARIA live region that screen readers will announce.
 */
export function LiveRegion({
  message,
  politeness = 'polite',
}: {
  message: string;
  politeness?: 'polite' | 'assertive';
}) {
  return (
    <div aria-live={politeness} aria-atomic="true" className="sr-only" role="status">
      {message}
    </div>
  );
}
