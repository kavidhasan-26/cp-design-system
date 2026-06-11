import { ArgTypes, Description, Stories, Subheading, Title } from '@storybook/blocks';

/** Docs layout without the full-height Primary canvas that causes empty space at the top. */
export function ComponentDocsPage() {
  return (
    <>
      <Title />
      <Description />
      <Subheading>Properties</Subheading>
      <ArgTypes />
      <Subheading>Stories</Subheading>
      <Stories />
    </>
  );
}
