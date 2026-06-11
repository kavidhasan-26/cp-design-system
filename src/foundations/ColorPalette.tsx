import { StyleSheet, Text, View } from 'react-native';
import type { PrimitiveColorScale } from '../tokens/primitives/colors';
import { primitiveColorTokens } from '../tokens/primitives/colors';
import { semanticColorGroups } from '../tokens/semantic/colors';
import { DocSection, TokenList, TokenRow } from './DocLayout';
import { docStyles, docTheme } from './docTheme';

function needsLightBorder(value: string) {
  const normalized = value.toLowerCase();
  return normalized === '#ffffff' || normalized === '#f3f3f3' || normalized === '#f4f4f4';
}

function Swatch({ value, size = 32 }: { value: string; size?: number }) {
  return (
    <View
      style={[
        styles.swatch,
        { backgroundColor: value, height: size, width: size },
        needsLightBorder(value) && styles.swatchBorder,
      ]}
    />
  );
}

type ColorRampProps = {
  title: string;
  tokens: Array<{ name: string; token: string; value: string }>;
};

function ColorRamp({ title, tokens }: ColorRampProps) {
  return (
    <View style={styles.rampBlock}>
      <Text style={styles.rampTitle}>{title}</Text>
      <View style={styles.rampRow}>
        {tokens.map((item) => (
          <View key={item.token} style={styles.rampItem}>
            <Swatch value={item.value} size={40} />
            <Text style={styles.rampLabel}>{item.name.split('/').pop()}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

type PrimitivePaletteProps = {
  scale: PrimitiveColorScale;
};

export function PrimitivePalette({ scale }: PrimitivePaletteProps) {
  return (
    <ColorRamp
      title={scale.charAt(0).toUpperCase() + scale.slice(1)}
      tokens={primitiveColorTokens[scale]}
    />
  );
}

export function SemanticColorsTable() {
  return (
    <>
      {semanticColorGroups.map((group) => (
        <DocSection key={group.title} title={group.title} description={group.description}>
          <TokenList>
            {group.tokens.map((token) => (
              <TokenRow key={token.token} compact>
                <Swatch value={token.value} />
                <View style={styles.rowMain}>
                  <Text style={docStyles.tokenName}>{token.name}</Text>
                  <Text style={docStyles.tokenMeta}>{token.token}</Text>
                </View>
                <Text style={docStyles.tokenValue}>{token.value.toUpperCase()}</Text>
              </TokenRow>
            ))}
          </TokenList>
        </DocSection>
      ))}
    </>
  );
}

export function PrimitivePalettes() {
  const scales: PrimitiveColorScale[] = ['purple', 'neutral', 'green', 'red', 'yellow', 'orange', 'blue'];

  return (
    <DocSection title="Primitives" description="Raw color scales behind semantic tokens.">
      <View style={styles.rampList}>
        {scales.map((scale) => (
          <PrimitivePalette key={scale} scale={scale} />
        ))}
      </View>
    </DocSection>
  );
}

const styles = StyleSheet.create({
  rampList: {
    gap: docTheme.space.xl,
  },
  rampBlock: {
    gap: docTheme.space.md,
  },
  rampTitle: {
    color: docTheme.colors.text,
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
  },
  rampRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: docTheme.space.md,
  },
  rampItem: {
    alignItems: 'center',
    gap: docTheme.space.xs,
    width: 48,
  },
  rampLabel: {
    color: docTheme.colors.textMuted,
    fontFamily: 'Inter',
    fontSize: 11,
    fontWeight: '400',
    textAlign: 'center',
  },
  swatch: {
    borderRadius: 6,
  },
  swatchBorder: {
    borderColor: docTheme.colors.border,
    borderWidth: 1,
  },
  rowMain: {
    flex: 1,
    gap: 2,
  },
});
