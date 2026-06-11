import { StyleSheet, Text, View } from 'react-native';
import { spaceTokens } from '../tokens/spacing';
import { DocSection, TokenList, TokenRow } from './DocLayout';
import { docStyles, docTheme } from './docTheme';

export function SpacingShowcase() {
  return (
    <DocSection title="Scale" description="Space-0 through Space-14 for padding, margins, and gaps.">
      <TokenList>
        {spaceTokens.map((row) => (
          <TokenRow key={row.token} compact>
            <View style={styles.previewTrack}>
              <View style={[styles.previewBar, { width: Math.max(row.value, 1) }]} />
            </View>
            <View style={styles.rowMain}>
              <Text style={docStyles.tokenName}>{row.name}</Text>
              <Text style={docStyles.tokenMeta}>{row.token}</Text>
            </View>
            <Text style={docStyles.tokenValue}>{row.value}px</Text>
          </TokenRow>
        ))}
      </TokenList>
    </DocSection>
  );
}

const styles = StyleSheet.create({
  previewTrack: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 120,
  },
  previewBar: {
    backgroundColor: docTheme.colors.text,
    borderRadius: 2,
    height: 6,
    minWidth: 1,
  },
  rowMain: {
    flex: 1,
    gap: 2,
  },
});
