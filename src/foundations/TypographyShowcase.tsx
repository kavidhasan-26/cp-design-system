import { Text, View } from 'react-native';
import type { TypographyStyleDefinition } from '../tokens/typography';
import { getTypographyStyle, typographyByCategory } from '../tokens/typography';
import { DocSection, TokenList, TokenRow } from './DocLayout';
import { docStyles } from './docTheme';

type TypographyCategory = keyof typeof typographyByCategory;

const categoryMeta: Record<TypographyCategory, { title: string; description: string }> = {
  heading: {
    title: 'Headings',
    description: 'Titles and section headers.',
  },
  numeral: {
    title: 'Numerals',
    description: 'Currency, metrics, and numeric emphasis.',
  },
  label: {
    title: 'Labels',
    description: 'UI labels, captions, and compact text.',
  },
  body: {
    title: 'Body',
    description: 'Paragraph and content text.',
  },
};

function TypographyRow({ row }: { row: TypographyStyleDefinition }) {
  return (
    <TokenRow>
      <View style={{ flex: 1.2, minWidth: 0 }}>
        <Text style={[getTypographyStyle(row.token), { color: '#171717' }]} numberOfLines={1}>
          The quick brown fox
        </Text>
      </View>
      <View style={{ flex: 0.8, gap: 2 }}>
        <Text style={docStyles.tokenName}>{row.name}</Text>
        <Text style={docStyles.tokenMeta}>{row.token}</Text>
      </View>
      <Text style={[docStyles.tokenValue, { flex: 0.7 }]}>
        {row.fontWeight} · {row.fontSize}px
      </Text>
    </TokenRow>
  );
}

export function TypographyShowcase() {
  return (
    <>
      {(Object.keys(typographyByCategory) as TypographyCategory[]).map((category) => {
        const meta = categoryMeta[category];

        return (
          <DocSection key={category} title={meta.title} description={meta.description}>
            <TokenList>
              {typographyByCategory[category].map((row) => (
                <TypographyRow key={row.token} row={row} />
              ))}
            </TokenList>
          </DocSection>
        );
      })}
    </>
  );
}
