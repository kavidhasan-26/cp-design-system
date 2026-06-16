import { ArgTypes, Description, Stories, Title, useOf } from '@storybook/blocks';
import { getComponentDocumentation } from './componentDocumentation';
import { DocCodeBlock, DocPageSections, DocSection } from './DocCodeBlock';

/** Docs layout without the full-height Primary canvas that causes empty space at the top. */
export function ComponentDocsPage() {
  const resolved = useOf('meta');
  const documentation =
    resolved.type === 'meta' ? getComponentDocumentation(resolved.preparedMeta.title) : undefined;

  return (
    <>
      <Title />
      <Description />
      <DocPageSections>
        {documentation ? (
          <>
            <DocSection title="Import">
              <DocCodeBlock>{documentation.imports}</DocCodeBlock>
            </DocSection>
            <DocSection title="Usage">
              <DocCodeBlock>{documentation.usage}</DocCodeBlock>
            </DocSection>
          </>
        ) : null}
        <DocSection title="Properties">
          <ArgTypes />
        </DocSection>
        <DocSection title="Stories">
          <div className="cp-stories-list">
            <Stories title={<></>} />
          </div>
        </DocSection>
      </DocPageSections>
    </>
  );
}
