import { StyleSheet, Text, View } from 'react-native';
import { radiusTokens } from '../tokens/radius';
import { DocSection, TokenList, TokenRow } from './DocLayout';
import { docStyles, docTheme } from './docTheme';

export function RadiusShowcase() {
  return (
    <DocSection title="Scale" description="Corner radius tokens from sharp to pill.">
      <TokenList>
        {radiusTokens.map((row) => (
          <TokenRow key={row.token} compact>
            <View
              style={[
                styles.preview,
                { borderRadius: row.value === 999 ? 999 : row.value },
              ]}
            />
            <View style={styles.rowMain}>
              <Text style={docStyles.tokenName}>{row.name}</Text>
              <Text style={docStyles.tokenMeta}>{row.token}</Text>
            </View>
            <Text style={docStyles.tokenValue}>
              {row.value === 999 ? '999px' : `${row.value}px`}
            </Text>
          </TokenRow>
        ))}
      </TokenList>
    </DocSection>
  );
}

const styles = StyleSheet.create({
  preview: {
    backgroundColor: docTheme.colors.codeBg,
    borderColor: docTheme.colors.border,
    borderWidth: 1,
    height: 36,
    width: 36,
  },
  rowMain: {
    flex: 1,
    gap: 2,
  },
});
