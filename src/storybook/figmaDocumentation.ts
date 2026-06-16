/** CP design system Figma file — Components page. */
export const FIGMA_DS_FILE_KEY = 'CoHNXBVyLx0jqxNNvDKeNU';

/** Deployed Storybook on GitHub Pages (matches deploy-storybook.yml). */
export const STORYBOOK_GITHUB_PAGES_BASE =
  'https://kavidhasan-26.github.io/cp-design-system/';

export function storybookStoryUrl(storyId: string) {
  return `${STORYBOOK_GITHUB_PAGES_BASE}?path=/story/${storyId}`;
}

export function storybookDocsUrl(storyTitle: string) {
  const slug = storyTitle
    .replace(/^Components\//, '')
    .toLowerCase()
    .replace(/\s+/g, '-');

  return `${STORYBOOK_GITHUB_PAGES_BASE}?path=/docs/components-${slug}--docs`;
}

export function figmaComponentUrl(nodeId: string) {
  return `https://www.figma.com/design/${FIGMA_DS_FILE_KEY}?node-id=${nodeId.replace(':', '-')}`;
}

/** Storybook Docs tab URL for a coded component — use for Figma `documentationLinks`. */
export function figmaDocumentationLinkForComponent(storyTitle: string) {
  return [{ uri: storybookDocsUrl(storyTitle) }];
}

/** Figma component sets ↔ Storybook Docs pages for all coded components. */
export const figmaComponentDocumentationTargets = [
  { figmaNodeId: '54:49', storyTitle: 'Components/Button' },
  { figmaNodeId: '174:921', storyTitle: 'Components/Button Group' },
  { figmaNodeId: '66:143', storyTitle: 'Components/Icon Button' },
  { figmaNodeId: '65:27', storyTitle: 'Components/Text Input' },
  { figmaNodeId: '212:459', storyTitle: 'Components/Phone Number Input' },
  { figmaNodeId: '221:561', storyTitle: 'Components/Password Input' },
  { figmaNodeId: '70:114', storyTitle: 'Components/Otp Input' },
  { figmaNodeId: '141:89', storyTitle: 'Components/Amount Display' },
  { figmaNodeId: '75:206', storyTitle: 'Components/Radio Button' },
  { figmaNodeId: '300:583', storyTitle: 'Components/Segmented Control' },
  { figmaNodeId: '347:584', storyTitle: 'Components/Bottom Sheet' },
  { figmaNodeId: '54:29', storyTitle: 'Components/Icons' },
] as const;

/** @deprecated Use figmaDocumentationLinkForComponent(storyTitle) for Figma Dev Mode links. */
export function figmaDocumentationLinkForStory(storyId: string) {
  return [{ uri: storybookStoryUrl(storyId) }];
}
