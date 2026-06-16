import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import { copyTextToClipboard } from './copyToClipboard';

/** Vertical gap between major doc sections — matches docTheme.layout.sectionGap. */
export const DOC_PAGE_SECTION_GAP_PX = 48;

type DocSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

/** Stacks all doc sections with uniform spacing — Introduction + component Docs tab. */
export function DocPageSections({ children }: { children: ReactNode }) {
  return <div className="cp-doc-page-sections">{children}</div>;
}

export function DocSection({ title, description, children }: DocSectionProps) {
  return (
    <section className="cp-doc-section">
      <div className="cp-doc-section-header">
        <h3 className="cp-doc-section-title">{title}</h3>
        {description ? <p className="cp-doc-section-description">{description}</p> : null}
      </div>
      <div className="cp-doc-section-body">{children}</div>
    </section>
  );
}

/** Groups consecutive code blocks within one section. */
export function DocBlockStack({ children }: { children: ReactNode }) {
  return <div className="cp-doc-block-stack">{children}</div>;
}

export function DocCodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const didCopy = await copyTextToClipboard(children);
    setCopied(didCopy);
    if (didCopy) {
      setTimeout(() => setCopied(false), 2000);
    }
  }, [children]);

  return (
    <div className="cp-code-block">
      <pre className="cp-code-block-text">{children}</pre>
      <button className="cp-code-block-copy" onClick={handleCopy} type="button">
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
